package service

import (
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/repository"
)

type CategoryService struct {
	repos repository.Category
}

func NewCategoryService(repos repository.Category) *CategoryService {
	return &CategoryService{repos: repos}
}

func (s *CategoryService) GetCategories() ([]gradwork.Category, error) {
	return s.repos.GetCategories()
}

func (s *CategoryService) CreateCategory(category gradwork.Category) (int, error) {
	return s.repos.CreateCategory(category)
}

func (s *CategoryService) GetCategoryById(categoryId int) (gradwork.Category, error) {
	return s.repos.GetCategoryById(categoryId)
}

func (s *CategoryService) GetCategoriesInCourse(courseId int) ([]gradwork.Category, error) {
	return s.repos.GetCategoriesInCourse(courseId)
}

func (s *CategoryService) UpdateCategory(categoryId int, input gradwork.UpdateCategoryInput) error {
	if err := input.Validate(); err != nil {
		return err
	}

	return s.repos.UpdateCategory(categoryId, input)
}

func (s *CategoryService) DeleteCategory(categoryId int) error {
	return s.repos.DeleteCategory(categoryId)
}
