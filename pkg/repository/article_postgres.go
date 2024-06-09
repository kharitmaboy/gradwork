package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
	"strings"
)

type ArticlePostgres struct {
	db *sqlx.DB
}

func NewArticlePostgres(db *sqlx.DB) *ArticlePostgres {
	return &ArticlePostgres{db: db}
}

func (r *ArticlePostgres) GetArticles() ([]gradwork.Article, error) {
	var articles []gradwork.Article

	query := fmt.Sprintf("SELECT a.id, a.title, a.body, cast(extract(epoch from a.date) AS int) AS date, a.user_id, a.category_id FROM %s AS a", articlesTable)
	err := r.db.Select(&articles, query)

	return articles, err
}

func (r *ArticlePostgres) GetArticleById(articleId int) (gradwork.Article, error) {
	var article gradwork.Article

	query := fmt.Sprintf(`SELECT a.id, a.title, a.body, cast(extract(epoch from a.date) AS int) AS date, a.user_id, a.category_id 
									FROM %s AS a WHERE a.id = $1`, articlesTable)
	err := r.db.Get(&article, query, articleId)

	return article, err
}

func (r *ArticlePostgres) GetSelfArticles(userId int) ([]gradwork.Article, error) {
	var articles []gradwork.Article

	query := fmt.Sprintf(`SELECT a.id, a.title, a.body, cast(extract(epoch from a.date) AS int) AS date, a.user_id, a.category_id 
									FROM %s AS a WHERE a.user_id = $1`, articlesTable)
	err := r.db.Select(&articles, query, userId)

	return articles, err
}

func (r *ArticlePostgres) GetArticlesInCategory(categoryId int) ([]gradwork.Article, error) {
	var articles []gradwork.Article

	query := fmt.Sprintf(`SELECT a.id, a.title, a.body, cast(extract(epoch from a.date) AS int) AS date, a.user_id, a.category_id 
									FROM %s AS a WHERE a.category_id = $1`, articlesTable)
	err := r.db.Select(&articles, query, categoryId)

	return articles, err
}

func (r *ArticlePostgres) CreateArticle(userId int, article gradwork.Article) (int, error) {
	var id int

	query := fmt.Sprintf(`INSERT INTO %s (title, body, date, user_id, category_id)
									VALUES ($1, $2, to_timestamp($3), $4, $5) RETURNING id`, articlesTable)
	row := r.db.QueryRow(query, article.Title, article.Body, article.Date, userId, article.CategoryId)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *ArticlePostgres) UpdateArticle(articleId int, input gradwork.UpdateArticleInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Title != nil {
		setValues, args = setInputValue(setValues, args, &argId, "title", input.Title)
	}

	if input.Body != nil {
		setValues, args = setInputValue(setValues, args, &argId, "body", input.Body)
	}

	if input.CategoryId != nil {
		setValues, args = setInputValue(setValues, args, &argId, "category_id", input.CategoryId)
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("UPDATE %s a SET %s WHERE a.id = $%d", articlesTable, setQuery, argId)
	args = append(args, articleId)

	_, err := r.db.Exec(query, args...)
	return err
}

func (r *ArticlePostgres) UpdateSelfArticle(articleId, userId int, input gradwork.UpdateArticleInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Title != nil {
		setValues, args = setInputValue(setValues, args, &argId, "title", input.Title)
	}

	if input.Body != nil {
		setValues, args = setInputValue(setValues, args, &argId, "body", input.Body)
	}

	if input.CategoryId != nil {
		setValues, args = setInputValue(setValues, args, &argId, "category_id", input.CategoryId)
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("UPDATE %s a SET %s WHERE a.id = $%d && a.user_id = $%d", articlesTable, setQuery, argId, argId+1)
	args = append(args, articleId, userId)

	_, err := r.db.Exec(query, args...)
	return err
}

func (r *ArticlePostgres) DeleteArticle(articleId int) error {
	query := fmt.Sprintf("DELETE FROM %s a WHERE a.id = $1", articlesTable)
	_, err := r.db.Exec(query, articleId)

	return err
}

func (r *ArticlePostgres) DeleteSelfArticle(articleId, userId int) error {
	query := fmt.Sprintf("DELETE FROM %s a WHERE a.id = $1 && a.user_id = $2", articlesTable)
	_, err := r.db.Exec(query, articleId, userId)

	return err
}
