package main

import (
	"github.com/joho/godotenv"
	"github.com/kharitmaboy/gradwork"
	"github.com/kharitmaboy/gradwork/pkg/handler"
	"github.com/kharitmaboy/gradwork/pkg/repository"
	"github.com/kharitmaboy/gradwork/pkg/service"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"os"
)

func main() {
	logrus.SetFormatter(new(logrus.JSONFormatter)) // Формат логов в JSON

	if err := initConfig(); err != nil {
		logrus.Fatalf("error initializing configs: %s", err.Error())
	}

	if err := godotenv.Load(); err != nil {
		logrus.Fatalf("error loading env variables: %s", err.Error())
	}

	db, err := repository.NewPostgresDB(repository.Config{
		Host:     viper.GetString("db.host"),
		Port:     viper.GetString("db.port"),
		Username: viper.GetString("db.username"),
		Password: os.Getenv("DB_PASSWORD"),
		DBName:   viper.GetString("db.dbname"),
		SSLMode:  viper.GetString("db.sslmode"),
	})
	if err != nil {
		logrus.Fatalf("failed to initialize db: %s", err.Error())
	}

	rep := repository.NewRepository(db)
	services := service.NewService(rep)
	handlers := handler.NewHandler(services)

	// InitRoutes возвращает *gin.Engine, который реализует интерфейс http.Handler
	srv := new(gradwork.Server)
	if err := srv.Run(viper.GetString("port"), handlers.InitRoutes()); err != nil {
		logrus.Fatalf("error while running http server: %s", err.Error())
	}
}

func initConfig() error {
	viper.AddConfigPath("configs")
	viper.SetConfigName("config")

	return viper.ReadInConfig()
}
