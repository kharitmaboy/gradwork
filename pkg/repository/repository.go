package repository

import (
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
)

const (
	usersTable      = "users"
	categoriesTable = "categories"
	articlesTable   = "articles"
)

type Authorization interface {
	CreateUser(user gradwork.User) (int, error)
	GetUser(username, password string) (gradwork.User, error)
}

type User interface {
	GetUsers() ([]gradwork.User, error)
	GetUserById(userId int) (gradwork.User, error)
	UpdateUser(userId int, input gradwork.UpdateUserInput) error
}

type Category interface {
}

type Article interface {
}

type Repository struct {
	Authorization
	User
	Category
	Article
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		User:         NewUserPostgres(db),
	}
}
