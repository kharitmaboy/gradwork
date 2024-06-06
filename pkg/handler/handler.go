package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/kharitmaboy/gradwork/pkg/service"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New() // Инициализация роутера

	auth := router.Group("/auth")
	{
		auth.POST("/sign-in", h.signIn)
	}

	users := router.Group("/users", h.userIdentity)
	{
		users.POST("/", h.signUp)
		users.GET("/", h.getUsers)
		users.GET("/:id", h.getUserById)
		users.PATCH("/:id", h.updateUser)
		users.DELETE(":id", h.deleteUser)

		articles := users.Group("/:id/articles")
		{
			articles.GET("/", h.getArticles)
			articles.POST("/", h.createArticle)
			articles.GET("/:id", h.getArticleById)
			articles.PUT("/:id", h.updateArticle)
			articles.DELETE("/:id", h.deleteArticle)
		}
	}

	categories := router.Group("/categories")
	{
		categories.GET("/", h.getCategories)
		categories.POST("/", h.createCategory)
		categories.GET("/:id", h.getCategoryById)
		categories.PUT("/:id", h.updateCategory)
		categories.DELETE("/:id", h.deleteCategory)

		//articles := categories.Group("/:id/articles")
		//{
		//	articles.GET("/", h.getArticlesInCategory)
		//	articles.GET("/:id", h.getArticleByIdInCategory)
		//}
	}

	return router
}
