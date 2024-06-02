package gradwork

type User struct {
	Id       int    `json:"-" db:"id"`
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
	Email    string `json:"email"`
	Status   string `json:"status" binding:"required"`
}
