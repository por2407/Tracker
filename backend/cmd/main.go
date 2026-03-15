package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"

	"tracker/internal/adapters/handlers"
	"tracker/internal/adapters/repositories"
	"tracker/internal/core/domain"
	"tracker/internal/core/service"
	"tracker/internal/infrastructure"
)

func main() {
	db, err := infrastructure.NewDB()
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}
	if err := db.AutoMigrate(&domain.User{}); err != nil {
		fmt.Println("Failed to migrate database:", err)
	}

	app := fiber.New()

	authRepo := repositories.NewPostgresAuthRepo(db)
	authService := service.NewAuthService(authRepo)
	authHandler := handlers.NewAuthHandler(authService)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, tracker!")
	})

	app.Post("/register", authHandler.Register)
	app.Post("/login", authHandler.Login)

	if err := app.Listen(":3000"); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
