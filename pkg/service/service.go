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

type User interface {
	GetUsers() ([]gradwork.User, error)
	GetUserById(userId int) (gradwork.User, error)
	UpdateUser(usetId int, input gradwork.UpdateUserInput) error
}

type Category interface {
}

type Article interface {
}

type Service struct {
	Authorization
	User
	Category
	Article
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
		User:         NewUserService(repos.User),
	}
}
