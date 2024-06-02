package gradwork

import "time"

type Category struct {
	Id   int    `json:"-" db:"id"`
	Name string `json:"name" binding:"required"`
}

type Article struct {
	Id         int       `json:"-" db:"id"`
	Title      string    `json:"title" binding:"required"`
	Body       string    `json:"body" binding:"required"`
	Date       time.Time `json:"date" binding:"required"`
	UserId     int
	CategoryId int
}
