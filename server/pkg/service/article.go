package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type ArticleService struct {
	repos repository.Article
}

func NewArticleService(repos repository.Article) *ArticleService {
	return &ArticleService{repos: repos}
}

func (s *ArticleService) GetArticles() ([]gradwork.Article, error) {
	return s.repos.GetArticles()
}

func (s *ArticleService) GetArticleById(articleId int) (gradwork.Article, error) {
	return s.repos.GetArticleById(articleId)
}

func (s *ArticleService) GetSelfArticles(userId int) ([]gradwork.Article, error) {
	return s.repos.GetSelfArticles(userId)
}

func (s *ArticleService) GetArticlesInCategory(categoryId int) ([]gradwork.Article, error) {
	return s.repos.GetArticlesInCategory(categoryId)
}

func (s *ArticleService) GetArticleAuthorName(articleId int) (string, error) {
	return s.repos.GetArticleAuthorName(articleId)
}

func (s *ArticleService) CreateArticle(userId int, article gradwork.Article) (int, error) {
	return s.repos.CreateArticle(userId, article)
}

func (s *ArticleService) UpdateArticle(articleId int, input gradwork.UpdateArticleInput) error {
	if err := input.Validate(); err != nil {
		return err
	}

	return s.repos.UpdateArticle(articleId, input)
}

func (s *ArticleService) UpdateSelfArticle(articleId, userId int, input gradwork.UpdateArticleInput) error {
	if err := input.Validate(); err != nil {
		return err
	}

	return s.repos.UpdateSelfArticle(articleId, userId, input)
}

func (s *ArticleService) DeleteArticle(articleId int) error {
	return s.repos.DeleteArticle(articleId)
}

func (s *ArticleService) DeleteSelfArticle(articleId, userId int) error {
	return s.repos.DeleteSelfArticle(articleId, userId)
}
