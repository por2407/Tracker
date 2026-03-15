package ports

import (
	"context"

	"tracker/internal/core/domain"
)

type AuthService interface {
	Register(ctx context.Context, name, email, password string) (*domain.UserResponse, error)
	Login(ctx context.Context, email, password string) (string, *domain.UserResponse, error)
}
