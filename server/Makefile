build:
	docker run --name=gradwork-db -e POSTGRES_PASSWORD='qwerty' -p 5432:5432 -d --rm postgres

run:
	go run cmd/app/main.go

migrate:
	migrate -path ./schema -database 'postgres://postgres:qwerty@localhost:5432/postgres?sslmode=disable' up

migrate-down:
	migrate -path ./schema -database 'postgres://postgres:qwerty@localhost:5432/postgres?sslmode=disable' down