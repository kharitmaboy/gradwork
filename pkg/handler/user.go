package handler

import (
	"github.com/gin-gonic/gin"
	"github.com/kharitmaboy/gradwork"
	"net/http"
)

type getUsersResponse struct {
	Data []gradwork.User `json:"data"`
}

func (h *Handler) getUsers(c *gin.Context) {
	users, err := h.services.Users.GetUsers()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getUsersResponse{
		Data: users,
	})
}

func (h *Handler) getUserById(c *gin.Context)     {}
func (h *Handler) updateUser(c *gin.Context)      {}
func (h *Handler) deleteUser(c *gin.Context)      {}
func (h *Handler) getCategories(c *gin.Context)   {}
func (h *Handler) createCategory(c *gin.Context)  {}
func (h *Handler) getCategoryById(c *gin.Context) {}
func (h *Handler) updateCategory(c *gin.Context)  {}
func (h *Handler) deleteCategory(c *gin.Context)  {}
func (h *Handler) getArticles(c *gin.Context)     {}
func (h *Handler) createArticle(c *gin.Context)   {}
func (h *Handler) getArticle(c *gin.Context)      {}
func (h *Handler) updateArticle(c *gin.Context)   {}
func (h *Handler) deleteArticle(c *gin.Context)   {}
