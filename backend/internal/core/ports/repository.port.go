package ports

import (
	"context"

	"tracker/internal/core/domain"
)

type AuthRepository interface {
	Register(ctx context.Context, name, email, hashedPassword string) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}
