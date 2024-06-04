package flowpilot

import (
	"errors"
	"fmt"
	"github.com/teamhanko/hanko/backend/flowpilot/utils"
	"net/url"
	"strings"
	"time"
)

type FlowBuilder interface {
	TTL(ttl time.Duration) FlowBuilder
	State(stateName StateName, actions ...Action) FlowBuilder
	InitialState(stateName StateName, nextStateNames ...StateName) FlowBuilder
	ErrorState(stateName StateName) FlowBuilder
	BeforeState(stateName StateName, hooks ...HookAction) FlowBuilder
	AfterState(stateName StateName, hooks ...HookAction) FlowBuilder
	Debug(enabled bool) FlowBuilder
	SubFlows(subFlows ...SubFlow) FlowBuilder
	Build() (Flow, error)
	MustBuild() Flow
	BeforeEachAction(hooks ...HookAction) FlowBuilder
	AfterEachAction(hooks ...HookAction) FlowBuilder
}

// defaultFlowBuilderBase is the base flow builder struct.
type defaultFlowBuilderBase struct {
	name                  string
	flow                  stateActions
	subFlows              SubFlows
	stateDetails          stateDetails
	beforeStateHooks      stateHooks
	afterStateHooks       stateHooks
	beforeEachActionHooks HookActions
	afterEachActionHooks  HookActions
}

// defaultFlowBuilder is a builder struct for creating a new Flow.
type defaultFlowBuilder struct {
	path                  string
	ttl                   time.Duration
	initialStateName      StateName
	initialNextStateNames []StateName
	errorStateName        StateName
	debug                 bool

	defaultFlowBuilderBase
}

// newFlowBuilderBase creates a new defaultFlowBuilderBase instance.
func newFlowBuilderBase(name string) defaultFlowBuilderBase {
	return defaultFlowBuilderBase{
		name:             name,
		flow:             make(stateActions),
		subFlows:         make(SubFlows, 0),
		stateDetails:     make(stateDetails),
		beforeStateHooks: make(stateHooks),
		afterStateHooks:  make(stateHooks),
	}
}

// NewFlow creates a new defaultFlowBuilder that builds a new flow available under the specified path.
func NewFlow(path string) FlowBuilder {
	u, _ := url.Parse(strings.TrimSpace(path))
	fbBase := newFlowBuilderBase(strings.ReplaceAll(strings.TrimFunc(u.Path, func(r rune) bool {
		return r == '/'
	}), "/", "_"))

	return &defaultFlowBuilder{path: path, defaultFlowBuilderBase: fbBase}
}

// TTL sets the time-to-live (TTL) for the flow.
func (fb *defaultFlowBuilder) TTL(ttl time.Duration) FlowBuilder {
	fb.ttl = ttl
	return fb
}

func (fb *defaultFlowBuilderBase) addState(stateName StateName, actions ...Action) {
	fb.flow[stateName] = append(fb.flow[stateName], actions...)
}

func (fb *defaultFlowBuilderBase) addBeforeStateHooks(stateName StateName, hooks ...HookAction) {
	fb.beforeStateHooks[stateName] = append(fb.beforeStateHooks[stateName], hooks...)
}

func (fb *defaultFlowBuilderBase) addAfterStateHooks(stateName StateName, hooks ...HookAction) {
	fb.afterStateHooks[stateName] = append(fb.afterStateHooks[stateName], hooks...)
}

func (fb *defaultFlowBuilder) addBeforeEachActionHooks(hooks ...HookAction) {
	fb.beforeEachActionHooks = append(fb.beforeEachActionHooks, hooks...)
}

func (fb *defaultFlowBuilder) addAfterEachActionHooks(hooks ...HookAction) {
	fb.afterEachActionHooks = append(fb.afterEachActionHooks, hooks...)
}

func (fb *defaultFlowBuilderBase) addSubFlows(subFlows ...SubFlow) {
	fb.subFlows = append(fb.subFlows, subFlows...)
}

func (fb *defaultFlowBuilderBase) addStateIfNotExists(stateNames ...StateName) {
	for _, stateName := range stateNames {
		if _, exists := fb.flow[stateName]; !exists {
			fb.addState(stateName)
		}
	}
}

// scanFlowStates iterates through each state in the provided flow and associates relevant information, also it checks
// for uniqueness of state names.
func (fb *defaultFlowBuilder) scanFlowStates(flow flowBase, isRootFlow bool, path utils.Path) error {
	// Check if states were already scanned, if so, don't scan again
	if len(fb.stateDetails) > 0 && isRootFlow {
		return nil
	}

	if path == nil {
		path = utils.NewPath(flow.getName())
	} else {
		path.Add(flow.getName())
	}

	// Iterate through states in the flow.
	for stateName, actions := range flow.getFlow() {
		// Check if state name is already in use.
		if _, ok := fb.stateDetails[stateName]; ok {
			continue
		}

		f := flow.getFlow()
		subFlows := flow.getSubFlows()
		beforeStateHooks := flow.getBeforeStateHooks()[stateName]
		afterStateHooks := flow.getAfterStateHooks()[stateName]

		// Check if the current state belongs to a sub-flow.
		if !fb.flow.stateExists(stateName) {
			// If the main flow includes hook actions for a sub-flow state, add the hooks defined in the main flow to
			// the list of hooks of the sub-flow state.
			beforeStateHooks = append(beforeStateHooks, fb.beforeStateHooks[stateName]...)
			afterStateHooks = append(afterStateHooks, fb.afterStateHooks[stateName]...)
		}

		actionDetails := make(defaultActionDetails, 0)
		for _, action := range actions {
			flowName := flow.getName()
			actionDetail := defaultActionDetail{action: action, flowName: flowName, path: utils.NewPath(path.String())}
			actionDetails = append(actionDetails, actionDetail)
		}

		// Create state details.
		state := stateDetail{
			name:             stateName,
			actionDetails:    actionDetails,
			flow:             f,
			subFlows:         subFlows,
			beforeStateHooks: beforeStateHooks,
			afterStateHooks:  afterStateHooks,
		}

		// Store state details.
		fb.stateDetails[stateName] = &state
	}

	// Recursively scan sub-flows.
	for _, sf := range flow.getSubFlows() {
		if err := fb.scanFlowStates(sf, false, utils.NewPath(path.String())); err != nil {
			return err
		}
	}

	return nil
}

// validate performs validation checks on the flow configuration.
func (fb *defaultFlowBuilder) validate() error {
	// Validate fixed states and their presence in the flow.
	if len(fb.initialStateName) == 0 {
		return errors.New("fixed state 'initialState' is not set")
	}
	if len(fb.errorStateName) == 0 {
		return errors.New("fixed state 'errorState' is not set")
	}
	if !fb.flow.stateExists(fb.initialStateName) && !fb.subFlows.stateExists(fb.initialStateName) {
		return fmt.Errorf("initial state '%s' does not belong to the flow or a sub-flow", fb.initialStateName)
	}
	if !fb.flow.stateExists(fb.errorStateName) {
		return fmt.Errorf("error state '%s' does not belong to the flow", fb.errorStateName)
	}
	if !fb.subFlows.stateExists(fb.initialStateName) && len(fb.initialNextStateNames) > 0 {
		return fmt.Errorf("initial state '%s' is not a sub-flow state, but next states have been provided", fb.initialStateName)
	}

	// Validate the specified next states, when the flow starts with a sub-flow.
	if err := fb.validateNextStateNames(); err != nil {
		return fmt.Errorf("failed to validate the specified next states: %w", err)
	}

	return nil
}

func (fb *defaultFlowBuilder) validateNextStateNames() error {
	for index, nextStateName := range fb.initialNextStateNames {
		stateExists := fb.flow.stateExists(nextStateName)
		subFlowStateExists := fb.subFlows.stateExists(nextStateName)

		if index == len(fb.initialNextStateNames)-1 {
			// The last state must be a member of the current flow or a sub-flow.
			if !stateExists && !subFlowStateExists {
				return fmt.Errorf("the last next state '%s' specified is not a sub-flow state or another state associated with the current flow", nextStateName)
			}
		} else {
			// Every other state must be a sub-flow state.
			if !subFlowStateExists {
				return fmt.Errorf("the specified next state '%s' is not a sub-flow state of the current flow", nextStateName)
			}
		}
	}

	return nil
}

// State adds a new state to the flow.
func (fb *defaultFlowBuilder) State(stateName StateName, actions ...Action) FlowBuilder {
	fb.addState(stateName, actions...)
	return fb
}

func (fb *defaultFlowBuilder) BeforeState(stateName StateName, hooks ...HookAction) FlowBuilder {
	fb.addBeforeStateHooks(stateName, hooks...)
	return fb
}

func (fb *defaultFlowBuilder) AfterState(stateName StateName, hooks ...HookAction) FlowBuilder {
	fb.addAfterStateHooks(stateName, hooks...)
	return fb
}

func (fb *defaultFlowBuilder) BeforeEachAction(hooks ...HookAction) FlowBuilder {
	fb.addBeforeEachActionHooks(hooks...)
	return fb
}

func (fb *defaultFlowBuilder) AfterEachAction(hooks ...HookAction) FlowBuilder {
	fb.addAfterEachActionHooks(hooks...)
	return fb
}

func (fb *defaultFlowBuilder) InitialState(stateName StateName, nextStateNames ...StateName) FlowBuilder {
	fb.initialStateName = stateName
	fb.initialNextStateNames = nextStateNames

	if len(fb.initialNextStateNames) == 0 {
		fb.addStateIfNotExists(stateName)
	}

	return fb
}

func (fb *defaultFlowBuilder) ErrorState(stateName StateName) FlowBuilder {
	fb.addStateIfNotExists(stateName)
	fb.errorStateName = stateName
	return fb
}

func (fb *defaultFlowBuilder) SubFlows(subFlows ...SubFlow) FlowBuilder {
	fb.addSubFlows(subFlows...)
	return fb
}

// Debug enables the debug mode, which causes the flow response to contain the actual error.
func (fb *defaultFlowBuilder) Debug(enabled bool) FlowBuilder {
	fb.debug = enabled
	return fb
}

// Build constructs and returns the Flow object.
func (fb *defaultFlowBuilder) Build() (Flow, error) {
	if err := fb.validate(); err != nil {
		return nil, fmt.Errorf("flow validation failed: %w", err)
	}

	dfb := defaultFlowBase{
		name:                  fb.name,
		flow:                  fb.flow,
		subFlows:              fb.subFlows,
		beforeStateHooks:      fb.beforeStateHooks,
		afterStateHooks:       fb.afterStateHooks,
		beforeEachActionHooks: fb.beforeEachActionHooks,
		afterEachActionHooks:  fb.afterEachActionHooks,
	}

	flow := &defaultFlow{
		path:                  fb.path,
		initialStateName:      fb.initialStateName,
		initialNextStateNames: fb.initialNextStateNames,
		errorStateName:        fb.errorStateName,
		stateDetails:          fb.stateDetails,
		ttl:                   fb.ttl,
		debug:                 fb.debug,
		defaultFlowBase:       dfb,
		contextValues:         make(contextValues),
	}

	if err := fb.scanFlowStates(flow, true, nil); err != nil {
		return nil, fmt.Errorf("failed to scan flow states: %w", err)
	}

	return flow, nil
}

// MustBuild constructs and returns the Flow object, panics on error.
func (fb *defaultFlowBuilder) MustBuild() Flow {
	f, err := fb.Build()

	if err != nil {
		panic(err)
	}

	return f
}