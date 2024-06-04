package credential_onboarding

import (
	"github.com/teamhanko/hanko/backend/flow_api/flow/shared"
	"github.com/teamhanko/hanko/backend/flowpilot"
)

type Back struct {
	shared.Action
}

func (a Back) GetName() flowpilot.ActionName {
	return shared.ActionBack
}

func (a Back) GetDescription() string {
	return "Navigate one step back."
}

func (a Back) Initialize(c flowpilot.InitializationContext) {
	if c.GetFlowName() == "registration" {
		previousState, _ := c.GetPreviousState()
		if previousState != nil && *previousState == shared.StatePasscodeConfirmation {
			c.SuspendAction()
		}
	} else if c.GetFlowName() == "login" {
		previousState, _ := c.GetPreviousState()
		if previousState != nil && (*previousState == shared.StatePasscodeConfirmation || *previousState != shared.StateCredentialOnboardingChooser) {
			c.SuspendAction()
		}
	}

}

func (a Back) Execute(c flowpilot.ExecutionContext) error {
	return c.ContinueToPreviousState()
}

func (a Back) Finalize(c flowpilot.FinalizationContext) error {
	return nil
}