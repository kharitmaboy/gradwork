package repository

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/kharitmaboy/gradwork"
	"strings"
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

func (r *UserPostgres) GetUserById(userId int) (gradwork.User, error) {
	var user gradwork.User

	query := fmt.Sprintf(`SELECT u.id, u.username, u.password_hash,
									u.name, u.surname, u.email, u.status FROM %s AS u WHERE u.id = $1`, usersTable)
	err := r.db.Get(&user, query, userId)

	return user, err
}

func (r *UserPostgres) UpdateUser(userId int, input gradwork.UpdateUserInput) error {
	setValues := make([]string, 0)
	args := make([]interface{}, 0)
	argId := 1

	if input.Username != nil {
		setValues, args = setInputValue(setValues, args, &argId, "username", input.Username)
	}

	if input.Password != nil {
		setValues, args = setInputValue(setValues, args, &argId, "password_hash", input.Password)
	}

	if input.Name != nil {
		setValues, args = setInputValue(setValues, args, &argId, "name", input.Name)
	}

	if input.Surname != nil {
		setValues, args = setInputValue(setValues, args, &argId, "surname", input.Surname)
	}

	if input.Email != nil {
		setValues, args = setInputValue(setValues, args, &argId, "email", input.Email)
	}

	if input.Status != nil {
		setValues, args = setInputValue(setValues, args, &argId, "status", input.Status)
	}

	setQuery := strings.Join(setValues, ", ")

	query := fmt.Sprintf("UPDATE %s u SET %s WHERE u.id = $%d",
		usersTable, setQuery, argId)
	args = append(args, userId)

	_, err := r.db.Exec(query, args...)
	return err
}

func setInputValue(setValues []string, args []interface{}, argId *int, filedName string, field interface{}) ([]string, []interface{}) {
	setValues = append(setValues, filedName+fmt.Sprintf("=$%d", *argId))
	args = append(args, field)
	*argId++

	return setValues, args
}
