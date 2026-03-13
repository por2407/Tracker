package handlers

import (
	"github.com/gofiber/fiber/v2"
	"tracker/internal/core/domain"
)

type AuthHandler struct{}

func NewAuthHandler() *AuthHandler {
	return &AuthHandler{}
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
	// Implement registration logic here
	var req domain.RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request payload",
		})
	}

	return c.JSON(fiber.Map{
		"username": req.Username,
		"email":    req.Email,
		"password": req.Password,
	})
}