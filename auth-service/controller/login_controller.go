package controller

import (
	"auth-service/models"
	"auth-service/repository"
	"auth-service/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

type ILoginController interface {
	GenerateToken(context *gin.Context)
	GetClaim(context *gin.Context)
}
type LoginController struct {
	UserRepository repository.UserRepository
}

func NewLoginController(userRepository repository.UserRepository) *LoginController {
	return &LoginController{UserRepository: userRepository}
}

func (l LoginController) GenerateToken(context *gin.Context) {
	var request models.TokenRequest

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}

	user, err := l.UserRepository.GetByUsername(context, request.Username)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		context.Abort()
		return
	}

	credentialError := user.CheckPassword(request.Password)
	if credentialError != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		context.Abort()
		return
	}

	tokenString, err := service.GenerateJWT(user)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func (l LoginController) GetClaim(context *gin.Context) {
	tokenString := context.GetHeader("Authorization")
	if tokenString == "" {
		context.JSON(401, gin.H{"error": "request does not contain an access token"})
		context.Abort()
		return
	}
	claim, err := service.ValidateToken(tokenString)
	if err != nil {
		context.JSON(401, gin.H{"error": err.Error()})
		context.Abort()
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"username":  claim.Username,
		"role":      claim.Role,
		"createdAt": claim.Timestamp,
		"exp":       claim.ExpiresAt,
	})
}
