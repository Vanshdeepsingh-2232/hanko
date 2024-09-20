package profile

import (
	"errors"
	"fmt"
	"github.com/teamhanko/hanko/backend/dto"
	"github.com/teamhanko/hanko/backend/flow_api/flow/shared"
	"github.com/teamhanko/hanko/backend/flowpilot"
	"github.com/teamhanko/hanko/backend/persistence/models"
)

type GetProfileData struct {
	shared.Action
}

func (h GetProfileData) Execute(c flowpilot.HookExecutionContext) error {
	deps := h.GetDeps(c)

	userModel, ok := c.Get("session_user").(*models.User)
	if !ok {
		return errors.New("no valid session")
	}

	profileData := dto.ProfileDataFromUserModel(userModel)
	profileData.MFAConfig.TOTPEnabled = deps.Cfg.MFA.Enabled && deps.Cfg.MFA.TOTP.Enabled
	profileData.MFAConfig.SecurityKeysEnabled = deps.Cfg.MFA.Enabled && deps.Cfg.MFA.SecurityKeys.Enabled

	if !deps.Cfg.Passkey.Enabled {
		profileData.Passkeys = nil
	}

	if !profileData.MFAConfig.SecurityKeysEnabled {
		profileData.SecurityKeys = nil
	}

	err := c.Payload().Set("user", profileData)
	if err != nil {
		return fmt.Errorf("failed to set user payload: %w", err)
	}

	return nil
}
