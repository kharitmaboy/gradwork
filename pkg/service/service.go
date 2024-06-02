package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type Authorization interface {
	CreateUser(user gradwork.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, error)
}

type Users interface {
	GetUsers() ([]gradwork.User, error)
}

type Categories interface {
}

type Articles interface {
}

type Service struct {
	Authorization
	Users
	Categories
	Articles
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		Users:         NewUserService(repos.Users),
	}
}
