package utils

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func LoadEnv() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Failed to load .env file")
	}
}

var DB *sql.DB
func LoadDatabase() {
	// Database Connection
	dbUser := os.Getenv("DBUSER")
	dbPass := os.Getenv("DBPASS")
	dbIp := os.Getenv("DBIP")
	var err error
	DB, err = sql.Open("mysql", dbUser + ":" + dbPass + "@tcp(" + dbIp + ")/degreeroadmap")
    if err != nil {
		log.Fatal("Failed to load database")
        //panic(err.Error())
    }
    //defer db.Close()
}