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
	DeleteUser(userId int) error
}

type Category interface {
	GetCategories() ([]gradwork.Category, error)
	CreateCategory(category gradwork.Category) (int, error)
	GetCategoryById(categoryId int) (gradwork.Category, error)
	UpdateCategory(categoryId int, input gradwork.UpdateCategoryInput) error
	DeleteCategory(categoryId int) error
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
		User:          NewUserPostgres(db),
		Category:      NewCategoryPostgres(db),
		Article:       NewArticlePostgres(db),
	}
}
