package main

import (
	"auth-service/controller"
	"auth-service/database"
	"auth-service/repository"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	db := database.Connect()
	userRepository := repository.NewUserRepository(db)
	loginController := controller.NewLoginController(*userRepository)

	router := gin.Default()
	api := router.Group("/api")
	{
		api.POST("/user/generate-token", loginController.GenerateToken)
		api.GET("/user/me", loginController.GetClaim)
	}

	router.Run(":8080")
}
