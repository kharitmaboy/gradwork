package service

import "github.com/kharitmaboy/gradwork/pkg/repository"

type ArticleService struct {
	repos repository.Article
}

func NewArticleService(repos repository.Article) *ArticleService {
	return &ArticleService{repos: repos}
}
