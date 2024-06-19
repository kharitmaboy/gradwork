package server

import (
	"context"
	"net/http"
	"time"
)

type Server struct { // Абстракция над структурой сервер из http пакета
	httpServer *http.Server // Указатель на структуру
}

func (s *Server) Run(port string, handler http.Handler) error { // Метод запуска сервера на передаваемом порту
	s.httpServer = &http.Server{ // Задаем поля структуры
		Addr:         ":" + port,       // Указываем адрес, который будет слушать сервер
		Handler:      handler,          // Указываем handler, который будет обрабатывать наши запросы
		ReadTimeout:  10 * time.Second, // Установка timeout на чтение запроса
		WriteTimeout: 10 * time.Second, // Утсановка timeout на запись ответа
	}

	return s.httpServer.ListenAndServe() // Под капотом запускает бесконечный for
}

func (s *Server) Shutdown(ctx context.Context) error { // Метод остановки сервера
	return s.httpServer.Shutdown(ctx)
}
