package server

import "errors"

type User struct {
	Id       int    `json:"id" db:"id"`
	Username string `json:"username" db:"username" binding:"required"`
	Password string `json:"password" db:"password_hash" binding:"required"`
	Name     string `json:"name" db:"name"`
	Surname  string `json:"surname" db:"surname"`
	Email    string `json:"email" db:"email"`
	Status   string `json:"status" db:"status" binding:"required"`
}

type UpdateUserInput struct {
	Username *string `json:"username"`
	Password *string `json:"password"`
	Name     *string `json:"name"`
	Surname  *string `json:"surname"`
	Email    *string `json:"email"`
	Status   *string `json:"status"`
}

func (i UpdateUserInput) Validate() error {
	if i.Username == nil && i.Password == nil && i.Name == nil && i.Surname == nil && i.Email == nil && i.Status == nil {
		return errors.New("invalid update structure")
	}

	return nil
}
