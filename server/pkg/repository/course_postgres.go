package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
	"strings"
)

type CoursePostgres struct {
	db *sqlx.DB
}

func NewCoursePostgres(db *sqlx.DB) *CoursePostgres {
	return &CoursePostgres{db: db}
}

func (r *CoursePostgres) GetCourses() ([]gradwork.Course, error) {
	var courses []gradwork.Course

	query := fmt.Sprintf("SELECT c.id, c.name, c.description FROM %s AS c", coursesTable)
	err := r.db.Select(&courses, query)

	return courses, err
}

func (r *CoursePostgres) CreateCourse(course gradwork.Course) (int, error) {
	var id int

	query := fmt.Sprintf("INSERT INTO %s (name, description) VALUES ($1, $2) RETURNING id", coursesTable)
	row := r.db.QueryRow(query, course.Name, course.Description)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *CoursePostgres) GetCourseById(courseId int) (gradwork.Course, error) {
	var course gradwork.Course

	query := fmt.Sprintf("SELECT c.id, c.name, c.description FROM %s AS c WHERE c.id = $1", coursesTable)
	err := r.db.Get(&course, query, courseId)

	return course, err
}

func (r *CoursePostgres) UpdateCourse(courseId int, input gradwork.UpdateCourseInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Name != nil {
		setValues, args = setInputValue(setValues, args, &argId, "name", input.Name)
	}

	if input.Description != nil {
		setValues, args = setInputValue(setValues, args, &argId, "description", input.Description)
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("UPDATE %s c SET %s WHERE c.id = $%d", coursesTable, setQuery, argId)
	args = append(args, courseId)

	_, err := r.db.Exec(query, args...)
	return err
}

func (r *CoursePostgres) DeleteCourse(courseId int) error {
	query := fmt.Sprintf("DELETE FROM %s c WHERE c.id = $1", coursesTable)
	_, err := r.db.Exec(query, courseId)

	return err
}
