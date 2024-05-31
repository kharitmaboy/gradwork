package service

import "github.com/kharitmaboy/gradwork/pkg/repository"

type Authorization interface {
}

type Service struct {
	Authorization
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Authorization: NewAuthService(repos.Authorization),
	}
}
