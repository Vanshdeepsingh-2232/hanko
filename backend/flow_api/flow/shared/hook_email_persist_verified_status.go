package shared

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"github.com/teamhanko/hanko/backend/persistence/models"
)

type EmailPersistVerifiedStatus struct {
	Action
}

func (h EmailPersistVerifiedStatus) Execute(c flowpilot.HookExecutionContext) error {
	deps := h.GetDeps(c)

	if !deps.Cfg.Emails.RequireVerification {
		return nil
	}

	if !c.Stash().Get("user_id").Exists() {
		return flowpilot.ErrorOperationNotPermitted
	}

	userId, err := uuid.FromString(c.Stash().Get("user_id").String())
	if err != nil {
		return fmt.Errorf("failed to parse stashed user_id into a uuid: %w", err)
	}

	if c.Stash().Get("email_verified").Bool() {
		emailAddressToVerify := c.Stash().Get("email").String()

		emailAddressToVerifyModel, err := deps.Persister.GetEmailPersisterWithConnection(deps.Tx).FindByAddress(emailAddressToVerify)
		if err != nil {
			return fmt.Errorf("could not fetch email: %w", err)
		}

		if emailAddressToVerifyModel != nil {
			if emailAddressToVerifyModel.Verified {
				return nil
			} else {
				emailAddressToVerifyModel.Verified = true
				err = deps.Persister.GetEmailPersisterWithConnection(deps.Tx).Update(*emailAddressToVerifyModel)
				if err != nil {
					return fmt.Errorf("could not update email: %w", err)
				}
			}
		} else {
			newEmailModel := models.NewEmail(&userId, emailAddressToVerify)
			newEmailModel.Verified = true

			err := deps.Persister.GetEmailPersisterWithConnection(deps.Tx).Create(*newEmailModel)
			if err != nil {
				return fmt.Errorf("could not save email: %w", err)
			}

			emailModels, err := deps.Persister.GetEmailPersisterWithConnection(deps.Tx).FindByUserId(*newEmailModel.UserID)
			if err != nil {
				return fmt.Errorf("could fetch emails: %w", err)
			}

			if len(emailModels) == 1 && emailModels[0].ID.String() == newEmailModel.ID.String() {
				// The user has only one 1 email and it is the email we just added. It makes sense then,
				// to automatically set this as the primary email.
				primaryEmailModel := models.NewPrimaryEmail(newEmailModel.ID, userId)
				err = deps.Persister.GetPrimaryEmailPersisterWithConnection(deps.Tx).Create(*primaryEmailModel)
				if err != nil {
					return fmt.Errorf("could not save primary email: %w", err)
				}
			}

			return nil
		}
	}

	return nil
}