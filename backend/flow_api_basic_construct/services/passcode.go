package services

import (
	"fmt"
	"github.com/gofrs/uuid"
	"github.com/teamhanko/hanko/backend/config"
	"github.com/teamhanko/hanko/backend/crypto"
	"github.com/teamhanko/hanko/backend/persistence"
	"github.com/teamhanko/hanko/backend/persistence/models"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type Passcode interface {
	SendEmailVerification(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error)
	SendLogin(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error)
	PasswordRecovery(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error)
}

type passcode struct {
	emailService      Email
	passcodeGenerator crypto.PasscodeGenerator
	persister         persistence.Persister
	cfg               config.Config
}

func NewPasscodeService(cfg config.Config, emailService Email, persister persistence.Persister) Passcode {
	return &passcode{
		emailService,
		crypto.NewPasscodeGenerator(),
		persister,
		cfg,
	}
}

func (service *passcode) SendEmailVerification(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error) {
	return service.sendPasscode(flowID, "email_verification", emailAddress, lang)
}

func (service *passcode) SendLogin(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error) {
	return service.sendPasscode(flowID, "login", emailAddress, lang)
}

func (service *passcode) PasswordRecovery(flowID uuid.UUID, emailAddress string, lang string) (uuid.UUID, error) {
	return service.sendPasscode(flowID, "password_recovery", emailAddress, lang)
}

func (service *passcode) sendPasscode(flowID uuid.UUID, template string, emailAddress string, lang string) (uuid.UUID, error) {
	code, err := service.passcodeGenerator.Generate()
	if err != nil {
		return uuid.Nil, err
	}
	hashedPasscode, err := bcrypt.GenerateFromPassword([]byte(code), 12)
	if err != nil {
		return uuid.Nil, err
	}

	passcodeId, err := uuid.NewV4()
	if err != nil {
		return uuid.Nil, err
	}

	now := time.Now().UTC()
	passcodeModel := models.Passcode{
		ID:        passcodeId,
		FlowID:    &flowID,
		Ttl:       service.cfg.Passcode.TTL,
		Code:      string(hashedPasscode),
		TryCount:  0,
		CreatedAt: now,
		UpdatedAt: now,
	}

	err = service.persister.GetPasscodePersister().Create(passcodeModel)
	if err != nil {
		return uuid.Nil, err
	}

	durationTTL := time.Duration(passcodeModel.Ttl) * time.Second
	data := map[string]interface{}{
		"Code":        code,
		"ServiceName": service.cfg.Service.Name,
		"TTL":         fmt.Sprintf("%.0f", durationTTL.Minutes()),
	}

	err = service.emailService.SendEmail(template, lang, data, emailAddress)
	if err != nil {
		return uuid.Nil, err
	}

	return passcodeId, nil
}
