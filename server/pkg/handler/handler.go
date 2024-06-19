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
		auth.POST("/sign-up", h.adminIdentity, h.signUp)
		auth.POST("/sign-in", h.signIn)
	}

	admin := router.Group("/admin", h.adminIdentity)
	{
		users := admin.Group("/users")
		{
			users.GET("/", h.getUsers)
			users.GET("/:id", h.getUserById)
			users.PATCH("/:id", h.updateUser)
			users.DELETE("/:id", h.deleteUser)
		}

		categories := admin.Group("/categories")
		{
			categories.POST("/", h.createCategory)
			categories.PATCH("/:id", h.updateCategory)
			categories.DELETE("/:id", h.deleteCategory)
		}

		articles := admin.Group("/articles")
		{
			articles.PATCH("/:id", h.updateArticle)
			articles.DELETE("/:id", h.deleteArticle)
		}
	}

	user := router.Group("/user", h.userIdentity)
	{
		user.GET("/", h.getSelf)
		user.PATCH("/", h.updateSelf)

		articles := user.Group("/articles")
		{
			articles.GET("/", h.getSelfArticles)
			articles.POST("/", h.createArticle)
			articles.PATCH("/:id", h.updateSelfArticle)
			articles.DELETE("/:id", h.deleteSelfArticle)
		}
	}

	categories := router.Group("/categories")
	{
		categories.GET("/", h.getCategories)
		categories.GET("/:id", h.getCategoryById)

		articles := categories.Group("/:id/articles")
		{
			articles.GET("/", h.getArticlesInCategory)
		}
	}

	articles := router.Group("/articles")
	{
		articles.GET("/", h.getArticles)
		articles.GET("/:id", h.getArticleById)
	}


	return router
}
