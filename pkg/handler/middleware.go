package handler

import (
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

const (
	authorizationHeader = "Authorization"
	userCtx             = "userId"
	userStatusCtx       = "userStatus"
)

func (h *Handler) userIdentity(c *gin.Context) {
	header := c.GetHeader(authorizationHeader)
	if header == "" {
		newErrorResponse(c, http.StatusUnauthorized, "Unauthorized")
		return
	}

	headerParts := strings.Split(header, " ")
	if len(headerParts) != 2 {
		newErrorResponse(c, http.StatusUnauthorized, "Unauthorized")
		return
	}

	userId, userStatus, err := h.services.Authorization.ParseToken(headerParts[1])
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, "Unauthorized")
		return
	}

	c.Set(userCtx, userId)
	c.Set(userStatusCtx, userStatus)
}

func (h *Handler) adminIdentity(c *gin.Context) {
	h.userIdentity(c)
	status, ok := c.Get(userStatusCtx)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user status not found")
		return
	}

	statusString, ok := status.(string)
	if !ok {
		newErrorResponse(c, http.StatusInternalServerError, "user status is of invalid type")
		return
	}

	if statusString != "admin" {
		newErrorResponse(c, http.StatusForbidden, "access is denied")
		return
	}
}

func getUserId(c *gin.Context) (int, error) {
	id, ok := c.Get(userCtx)
	if !ok {
		return 0, errors.New("user not found")
	}

	idInt, ok := id.(int)
	if !ok {
		return 0, errors.New("user id is of invalid type")
	}

	return idInt, nil
}
