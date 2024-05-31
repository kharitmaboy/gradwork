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

	// @todo продумать эндпоинты для проекта
	//Эндопинты для авторизации
	auth := router.Group("/auth") // Группировка по маршрутам
	{
		auth.POST("/sign-up") //, h.signUp) // Эндроинт для регистрации
		auth.POST("/sign-in") //, h.signIn) // Эндпоинт для авторизации
	}

	// Определение эндпоинтов для операций над файлами
	/*
		files := router.Group("/files", h.userIdentity)
		{
			files.GET("/", h.getFiles)         // Список всех файлов
			files.POST("/", h.loadFile)        // Загрузка файла
			files.GET("/:id", h.getFileById)   // Получение файла по id
			files.POST("/:id", h.sendFile)     // Отправка файла
			files.PATCH("/:id", h.editFile)    // Редактирование файла
			files.DELETE("/:id", h.deleteFile) // Удаление файла

			// Определение эндпоинтов для операций над комментариями
			comments := files.Group("/:id/comments")
			{
				comments.GET("/", h.getComments)    // Получение комментариев файла
				comments.POST("/", h.createComment) // Создание комментария под файлом
			}
		}
	*/

	return router
}
