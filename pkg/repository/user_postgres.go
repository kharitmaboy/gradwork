package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
)

type UserPostgres struct {
	db *sqlx.DB
}

func NewUserPostgres(db *sqlx.DB) *UserPostgres {
	return &UserPostgres{db: db}
}

func (r *UserPostgres) GetUsers() ([]gradwork.User, error) {
	var users []gradwork.User

	query := fmt.Sprintf(`SELECT u.id, u.username, u.password_hash,
									u.name, u.surname, u.email, u.status FROM %s AS u`, usersTable)
	err := r.db.Select(&users, query)

	return users, err
}
