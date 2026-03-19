package ports

import (
	"context"
	"time"

	"tracker/internal/core/domain"
)

type AuthService interface {
	Register(ctx context.Context, name, email, password string) (*domain.UserResponse, error)
	Login(ctx context.Context, email, password string) (string, *domain.UserResponse, error)
}

type TransactionService interface {
	GetSummaryByUserID(ctx context.Context, userID int, filterType string, date time.Time) (*domain.SummaryResponse, error)
	Create(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error)
	Edit(ctx context.Context, transaction *domain.Transaction) (*domain.Transaction, error)
	Delete(ctx context.Context, id int) error
}

type CategoryService interface {
	GetAll(ctx context.Context) ([]*domain.Category, error)
}
