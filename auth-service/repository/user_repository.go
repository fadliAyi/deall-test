package repository

import (
	"auth-service/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type IUserRepository interface {
	GetByUsername(ctx *gin.Context, phone string) models.User
}

type UserRepository struct {
	DBInstance *gorm.DB
}

func NewUserRepository(DBInstance *gorm.DB) *UserRepository {
	return &UserRepository{DBInstance: DBInstance}
}

func (user UserRepository) GetByUsername(ctx *gin.Context, phone string) (models.User, error) {
	var UserModel models.User
	data := user.DBInstance.Where("username = ?", phone).First(&UserModel)
	if data.Error != nil {
		return UserModel, data.Error
	}
	return UserModel, nil
}
