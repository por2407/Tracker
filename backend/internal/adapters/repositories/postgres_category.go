package repositories

import (
	"context"
	"tracker/internal/core/domain"

	"gorm.io/gorm"
)

type PostgresCategoryRepo struct {
	db *gorm.DB
}

func NewPostgresCategoryRepo(db *gorm.DB) *PostgresCategoryRepo {
	return &PostgresCategoryRepo{db: db}
}

func (r *PostgresCategoryRepo) GetAll(ctx context.Context) ([]*domain.Category, error) {
	var categories []*domain.Category
	if err := r.db.WithContext(ctx).Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}
