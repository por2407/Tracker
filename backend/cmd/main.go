package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"

	"tracker/internal/infrastructure"
	"tracker/internal/core/domain"

	"tracker/internal/adapters/handlers"
)

func main(){
    db, err := infrastructure.NewDB()
	if err != nil {
		fmt.Println("Failed to connect to database:", err)
		return
	}
	db.AutoMigrate(&domain.User{})

	app := fiber.New()

	authHandler := handlers.NewAuthHandler()


    app.Get("/", func (c *fiber.Ctx) error {
        return c.SendString("Hello, tracker!")
    })

	app.Post("/register", authHandler.Register)

	if err := app.Listen(":3000"); err != nil{
		fmt.Println("Failed to start server:", err)
	}
}
