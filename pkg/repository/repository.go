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

type Users interface {
	GetUsers() ([]gradwork.User, error)
}

type Categories interface {
}

type Articles interface {
}

type Repository struct {
	Authorization
	Users
	Categories
	Articles
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
		Users:         NewUserPostgres(db),
	}
}
