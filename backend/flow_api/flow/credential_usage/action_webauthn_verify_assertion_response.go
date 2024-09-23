package credential_usage

import (
	"errors"
	"fmt"
	"github.com/gofrs/uuid"
	auditlog "github.com/teamhanko/hanko/backend/audit_log"
	"github.com/teamhanko/hanko/backend/flow_api/flow/shared"
	"github.com/teamhanko/hanko/backend/flow_api/services"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"github.com/teamhanko/hanko/backend/persistence/models"
)

type WebauthnVerifyAssertionResponse struct {
	shared.Action
}

func (a WebauthnVerifyAssertionResponse) GetName() flowpilot.ActionName {
	return shared.ActionWebauthnVerifyAssertionResponse
}

func (a WebauthnVerifyAssertionResponse) GetDescription() string {
	return "Send the result which was generated by using a webauthn credential."
}

func (a WebauthnVerifyAssertionResponse) Initialize(c flowpilot.InitializationContext) {
	if !c.Stash().Get(shared.StashPathWebauthnAvailable).Bool() {
		c.SuspendAction()
	}

	c.AddInputs(flowpilot.JSONInput("assertion_response").Required(true))
}

func (a WebauthnVerifyAssertionResponse) Execute(c flowpilot.ExecutionContext) error {
	deps := a.GetDeps(c)

	if valid := c.ValidateInputData(); !valid {
		return c.Error(flowpilot.ErrorFormDataInvalid)
	}

	if !c.Stash().Get(shared.StashPathWebauthnSessionDataID).Exists() {
		return errors.New("webauthn_session_data_id is not present in the stash")
	}

	sessionDataID := uuid.FromStringOrNil(c.Stash().Get(shared.StashPathWebauthnSessionDataID).String())
	assertionResponse := c.Input().Get("assertion_response").String()

	isMFA := c.Stash().Get(shared.StashPathMFAUsageMethod).String() == "security_key"

	params := services.VerifyAssertionResponseParams{
		Tx:                deps.Tx,
		SessionDataID:     sessionDataID,
		AssertionResponse: assertionResponse,
		IsMFA:             isMFA,
	}

	userModel, err := deps.WebauthnService.VerifyAssertionResponse(params)
	if err != nil {
		if errors.Is(err, services.ErrInvalidWebauthnCredential) ||
			errors.Is(err, services.ErrInvalidWebauthnCredentialMFAOnly) {

			if errors.Is(err, services.ErrInvalidWebauthnCredentialMFAOnly) {
				c.SetFlowError(shared.ErrorWebauthnCredentialInvalidMFAOnly)
			} else {
				c.SetFlowError(shared.ErrorPasskeyInvalid.Wrap(err))
			}

			err = deps.AuditLogger.CreateWithConnection(
				deps.Tx,
				deps.HttpContext,
				models.AuditLogLoginFailure,
				userModel,
				err,
				auditlog.Detail("login_method", "passkey"),
				auditlog.Detail("flow_id", c.GetFlowID()))

			if err != nil {
				return fmt.Errorf("could not create audit log: %w", err)
			}

			return c.Continue(shared.StateError)
		}

		return fmt.Errorf("failed to verify assertion response: %w", err)
	}

	// Set only for audit logging purposes.
	if !isMFA {
		err = c.Stash().Set(shared.StashPathLoginMethod, "passkey")
		if err != nil {
			return fmt.Errorf("failed to set login_method to the stash: %w", err)
		}
	}

	if userModel != nil {
		_ = c.Stash().Set(shared.StashPathUserID, userModel.ID.String())
		_ = c.Stash().Set(shared.StashPathUsername, userModel.GetUsername())
		_ = c.Stash().Set(shared.StashPathUserHasPasskey, len(userModel.GetPasskeys()) > 0)
		_ = c.Stash().Set(shared.StashPathUserHasPassword, userModel.PasswordCredential != nil)
		_ = c.Stash().Set(shared.StashPathUserHasWebauthnCredential, len(userModel.WebauthnCredentials) > 0)
		_ = c.Stash().Set(shared.StashPathUserHasOTPSecret, userModel.OTPSecret != nil)
		_ = c.Stash().Set(shared.StashPathUserHasUsername, userModel.GetUsername() != nil)
		_ = c.Stash().Set(shared.StashPathUserHasEmails, len(userModel.Emails) > 0)
		_ = c.Stash().Set(shared.StashPathUserHasSecurityKey, len(userModel.GetSecurityKeys()) > 0)
		_ = c.Stash().Set(shared.StashPathUsePasskeyForMFA, userModel.UsePasskeyForMFA)

		if primary := userModel.Emails.GetPrimary(); primary != nil {
			_ = c.Stash().Set(shared.StashPathEmail, primary.Address)
		}
	}

	c.PreventRevert()

	return c.Continue()
}
