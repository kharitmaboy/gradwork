package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type UserService struct {
	repos repository.Users
}

func NewUserService(repos repository.Users) *UserService {
	return &UserService{repos: repos}
}

func (s *UserService) GetUsers() ([]gradwork.User, error) {
	return s.repos.GetUsers()
}