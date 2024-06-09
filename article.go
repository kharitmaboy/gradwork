package gradwork

import (
	"errors"
	"time"
)

type Category struct {
	Id   int    `json:"id" db:"id"`
	Name string `json:"name" binding:"required"`
}

type Article struct {
	Id         int       `json:"id" db:"id"`
	Title      string    `json:"title" binding:"required"`
	Body       string    `json:"body" binding:"required"`
	Date       time.Time `json:"date" binding:"required"`
	UserId     int
	CategoryId int `json:"category_id" binding:"required"`
}

type UpdateCategoryInput struct {
	Name *string `json:"name"`
}

func (i UpdateCategoryInput) Validate() error {
	if i.Name == nil {
		return errors.New("invalid update structure")
	}

	return nil
}

type UpdateArticleInput struct {
	Title      *string `json:"title"`
	Body       *string `json:"body"`
	CategoryId *int    `json:"category_id"`
}

func (i UpdateArticleInput) Validate() error {
	if i.Title == nil && i.Body == nil && i.CategoryId == nil {
		return errors.New("invalid update structure")
	}

	return nil
}
