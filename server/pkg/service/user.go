package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type UserService struct {
	repos repository.User
}

func NewUserService(repos repository.User) *UserService {
	return &UserService{repos: repos}
}

func (s *UserService) GetUsers() ([]gradwork.User, error) {
	return s.repos.GetUsers()
}

func (s *UserService) GetUserById(userId int) (gradwork.User, error) {
	return s.repos.GetUserById(userId)
}

func (s *UserService) UpdateUser(userId int, input gradwork.UpdateUserInput) error {
	if err := input.Validate(); err != nil {
		return err
	}
	*input.Password = GeneratePasswordHash(*input.Password)

	return s.repos.UpdateUser(userId, input)
}

func (s *UserService) DeleteUser(userId int) error {
	return s.repos.DeleteUser(userId)
}
