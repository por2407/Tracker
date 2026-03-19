package ports

import (
	"context"
	"time"

	"tracker/internal/core/domain"
)

type AuthRepository interface {
	Register(ctx context.Context, name, email, hashedPassword string) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

type TransactionRepository interface {
	GetByUserIDAndDateRange(ctx context.Context, userID int, start, end time.Time) ([]*domain.Transaction, error)
	Create(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error)
	Edit(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error)
	Delete(ctx context.Context, id int) error
}

type CategoryRepository interface {
	GetAll(ctx context.Context) ([]*domain.Category, error)
}
