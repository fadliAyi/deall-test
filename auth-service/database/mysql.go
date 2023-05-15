package database

import (
	"auth-service/helper"
	"auth-service/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"os"
)

func Connect() *gorm.DB {
	username := os.Getenv("MYSQL_USER")
	userPass := os.Getenv("MYSQL_PASSWORD")
	host := os.Getenv("MYSQL_HOST")
	port := os.Getenv("MYSQL_PORT")
	dbName := os.Getenv("MYSQL_DBNAME")
	dsn := username + ":" + userPass + "@tcp(" + host + ":" + port + ")/" + dbName + "?charset=utf8mb4&parseTime=True&loc=Local"
	Instance, dbError := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if dbError != nil {
		log.Fatal(dbError)
		panic("Cannot connect to DB")
	}
	log.Println("Connected to Database!")
	Instance.AutoMigrate(&models.User{})
	log.Println("Database Migration Completed!")

	hashPassword, hashError := helper.HashPassword("admin123")
	if hashError != nil {
		log.Fatal(hashError)
		panic("Cannot generate hash password")
	}
	Instance.Create(&models.User{Username: "admin", Password: hashPassword, Role: "admin"})
	Instance.Create(&models.User{Username: "john doe", Password: hashPassword, Role: "user"})
	log.Println("Create User Completed!")
	return Instance
}
