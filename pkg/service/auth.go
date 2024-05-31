package service

import "github.com/kharitmaboy/gradwork/pkg/repository"

type AuthService struct {
	repos repository.Authorization
}

func NewAuthService(repos repository.Authorization) *AuthService {
	return &AuthService{repos: repos}
}
