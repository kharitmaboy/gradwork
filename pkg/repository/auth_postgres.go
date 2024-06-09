package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
)

type AuthPostgres struct {
	db *sqlx.DB
}

func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db: db}
}

func (r *AuthPostgres) CreateUser(user gradwork.User) (int, error) {
	var id int

	query := fmt.Sprintf(`INSERT INTO %s (username, password_hash, name, surname, email, status)
									VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`, usersTable)
	row := r.db.QueryRow(query, user.Username, user.Password, user.Name, user.Surname, user.Email, user.Status)

	if err := row.Scan(&id); err != nil {
		return 0, err
	}

	return id, nil
}

func (r *AuthPostgres) GetUser(username, password string) (gradwork.User, error) {
	var user gradwork.User

	query := fmt.Sprintf("SELECT id, status FROM %s WHERE username=$1 AND password_hash=$2", usersTable)
	err := r.db.Get(&user, query, username, password)

	return user, err
}
