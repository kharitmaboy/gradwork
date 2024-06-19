package repository

import "fmt"

func setInputValue(
	setValues []string,
	args []interface{},
	argId *int,
	filedName string,
	field interface{},
) ([]string, []interface{}) {
	setValues = append(setValues, filedName+fmt.Sprintf("=$%d", *argId))
	args = append(args, field)
	*argId++

	return setValues, args
}
