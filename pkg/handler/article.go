package handler

import (
	"github.com/gin-gonic/gin"
)

func (h *Handler) getArticles(c *gin.Context) {
	//userId, err := getUserId(c)
	//if err != nil {
	//	return
	//}
	//
	//lists, err := h.services.TodoList.GetAll(userId)
	//if err != nil {
	//	newErrorResponse(c, http.StatusInternalServerError, err.Error())
	//	return
	//}
	//
	//c.JSON(http.StatusOK, getAllListsResponse{
	//	Data: lists,
	//})
}

func (h *Handler) createArticle(c *gin.Context) {

}

func (h *Handler) getArticleById(c *gin.Context) {

}

func (h *Handler) updateArticle(c *gin.Context) {

}

func (h *Handler) deleteArticle(c *gin.Context) {

}
