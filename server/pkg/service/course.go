package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type CourseService struct {
	repos repository.Course
}

func NewCourseService(repos repository.Course) *CourseService {
	return &CourseService{repos: repos}
}

func (s *CourseService) GetCourses() ([]gradwork.Course, error) {
	return s.repos.GetCourses()
}

func (s *CourseService) CreateCourse(course gradwork.Course) (int, error) {
	return s.repos.CreateCourse(course)
}

func (s *CourseService) GetCourseById(courseId int) (gradwork.Course, error) {
	return s.repos.GetCourseById(courseId)
}

func (s *CourseService) UpdateCourse(courseId int, input gradwork.UpdateCourseInput) error {
	if err := input.Validate(); err != nil {
		return err
	}

	return s.repos.UpdateCourse(courseId, input)
}

func (s *CourseService) DeleteCourse(courseId int) error {
	return s.repos.DeleteCourse(courseId)
}
