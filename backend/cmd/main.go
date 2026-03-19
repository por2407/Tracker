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
	if err := db.AutoMigrate(&domain.User{}, &domain.Transaction{}); err != nil {
		fmt.Println("Failed to migrate database:", err)
	}

	app := fiber.New()

	authRepo := repositories.NewPostgresAuthRepo(db)
	authService := service.NewAuthService(authRepo)
	authHandler := handlers.NewAuthHandler(authService)

	transactionRepo := repositories.NewPostgresTransactionRepo(db)
	transactionService := service.NewTransactionService(transactionRepo)
	transactionHandler := handlers.NewTransactionHandler(transactionService)

	categoryRepo := repositories.NewPostgresCategoryRepo(db)
	categoryService := service.NewCategoryService(categoryRepo)
	categoryHandler := handlers.NewCategoryHandler(categoryService)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, tracker!")
	})

	app.Post("/register", authHandler.Register)
	app.Post("/login", authHandler.Login)

	// Transaction routes
	app.Get("/transactions/:userID", transactionHandler.GetSummaryByUserID)
	app.Post("/transactions", transactionHandler.Create)
	app.Put("/transactions", transactionHandler.Edit)
	app.Delete("/transactions/:userID", transactionHandler.Delete)

	app.Get("/categories", categoryHandler.GetAll)

	if err := app.Listen(":3000"); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}
