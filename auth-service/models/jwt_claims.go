package models

import (
	"github.com/golang-jwt/jwt/v5"
	"time"
)

type JWTClaim struct {
	Username  string    `json:"username"`
	Role      string    `json:"role"`
	Timestamp time.Time `json:"timestamp"`
	jwt.RegisteredClaims
}
