package service

import (
	"context"
	"tracker/internal/core/domain"
	"tracker/internal/core/ports"
)

type CategoryService struct {
	categoryRepo ports.CategoryRepository
}

func NewCategoryService(categoryRepo ports.CategoryRepository) *CategoryService {
	return &CategoryService{categoryRepo: categoryRepo}
}

func (s *CategoryService) GetAll(ctx context.Context) ([]*domain.Category, error) {
	return s.categoryRepo.GetAll(ctx)
}
