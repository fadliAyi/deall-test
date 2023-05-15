package models

type TokenRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
