package repositories

import (
	"context"
	"tracker/internal/core/domain"

	"gorm.io/gorm"
)

type PostgresAuthRepo struct {
	db *gorm.DB
}

func NewPostgresAuthRepo(db *gorm.DB) *PostgresAuthRepo {
	return &PostgresAuthRepo{db: db}
}

func (r *PostgresAuthRepo) Register(ctx context.Context, name, email, hashedPassword string) (*domain.User, error) {
	user := domain.User{
		Name:     name,
		Email:    email,
		Password: hashedPassword,
	}
	if err := r.db.WithContext(ctx).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *PostgresAuthRepo) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	if err := r.db.WithContext(ctx).Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
