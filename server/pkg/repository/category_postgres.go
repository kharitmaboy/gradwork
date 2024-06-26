package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
	"strings"
)

type CategoryPostgres struct {
	db *sqlx.DB
}

func NewCategoryPostgres(db *sqlx.DB) *CategoryPostgres {
	return &CategoryPostgres{db: db}
}

func (r *CategoryPostgres) GetCategories() ([]gradwork.Category, error) {
	var categories []gradwork.Category

	query := fmt.Sprintf("SELECT c.id, c.name, c.course_id FROM %s AS c", categoriesTable)
	err := r.db.Select(&categories, query)

	return categories, err
}

func (r *CategoryPostgres) CreateCategory(category gradwork.Category) (int, error) {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (name, course_id) VALUES ($1, $2) RETURNING id", categoriesTable)
	row := r.db.QueryRow(query, category.Name, category.CourseId)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CategoryPostgres) GetCategoryById(categoryId int) (gradwork.Category, error) {
	var category gradwork.Category

	query := fmt.Sprintf("SELECT c.id, c.name, c.course_id FROM %s AS c WHERE c.id = $1", categoriesTable)
	err := r.db.Get(&category, query, categoryId)

	return category, err
}

func (r *CategoryPostgres) GetCategoriesInCourse(courseId int) ([]gradwork.Category, error) {
	var categories []gradwork.Category

	query := fmt.Sprintf("SELECT c.id, c.name, c.course_id FROM %s AS c WHERE c.course_id = $1", categoriesTable)
	err := r.db.Select(&categories, query, courseId)

	return categories, err
}

func (r *CategoryPostgres) UpdateCategory(categoryId int, input gradwork.UpdateCategoryInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Name != nil {
		setValues, args = setInputValue(setValues, args, &argId, "name", input.Name)
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("UPDATE %s c SET %s WHERE c.id = $%d", categoriesTable, setQuery, argId)
	args = append(args, categoryId)

	_, err := r.db.Exec(query, args...)
	return err
}

func (r *CategoryPostgres) DeleteCategory(categoryId int) error {
	query := fmt.Sprintf("DELETE FROM %s c WHERE c.id = $1", categoriesTable)
	_, err := r.db.Exec(query, categoryId)

	return err
}
