package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type Authorization interface {
	CreateUser(user gradwork.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, string, error)
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
	GetArticles() ([]gradwork.Article, error)
	GetArticleById(articleId int) (gradwork.Article, error)
	GetSelfArticles(userId int) ([]gradwork.Article, error)
	GetArticlesInCategory(categoryId int) ([]gradwork.Article, error)
	CreateArticle(userId int, article gradwork.Article) (int, error)
	UpdateArticle(articleId int, input gradwork.UpdateArticleInput) error
	UpdateSelfArticle(articleId, userId int, input gradwork.UpdateArticleInput) error
	DeleteArticle(articleId int) error
	DeleteSelfArticle(articleId, userId int) error
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
		User:          NewUserService(repos.User),
		Category:      NewCategoryService(repos.Category),
		Article:       NewArticleService(repos.Article),
	}
}
