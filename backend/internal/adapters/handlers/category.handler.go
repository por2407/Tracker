package handlers

import (
	"tracker/internal/core/ports"

	"github.com/gofiber/fiber/v2"
)

type CategoryHandler struct {
	categoryService ports.CategoryService
}

func NewCategoryHandler(categoryService ports.CategoryService) *CategoryHandler {
	return &CategoryHandler{categoryService: categoryService}
}

func (h *CategoryHandler) GetAll(c *fiber.Ctx) error {
	categories, err := h.categoryService.GetAll(c.Context())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(categories)
}
