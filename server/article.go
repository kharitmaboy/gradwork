package gradwork

import (
	"errors"
)

type Course struct {
	Id          int    `json:"id" db:"id"`
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
}

type Category struct {
	Id       int    `json:"id" db:"id"`
	Name     string `json:"name" binding:"required"`
	CourseId int    `json:"course_id" db:"course_id" binding:"required"`
}

type Article struct {
	Id         int    `json:"id" db:"id"`
	Title      string `json:"title" binding:"required"`
	Body       string `json:"body" binding:"required"`
	Date       int64  `json:"date" binding:"required"`
	UserId     int    `json:"user_id" db:"user_id"`
	CategoryId int    `json:"category_id" db:"category_id" binding:"required"`
}

type UpdateCourseInput struct {
	Name        *string `json:"name"`
	Description *string `json:"description"`
}

func (i UpdateCourseInput) Validate() error {
	if i.Name == nil && i.Description == nil {
		return errors.New("invalid update structure")
	}

	return nil
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
