package main

import (
	"fmt"
	"os"
	"database/sql"
    _ "github.com/go-sql-driver/mysql"
)

type Course struct {
    id int `json:"id"`
	prefix string `json:"prefix"`
	number int `json:"number"`
	name string `json:"name"`
	level string `json:"level"`
	historical_semester string `json:"historical_semester"`
	core string `json:"core"`
}


func main() {
    fmt.Println("This is a filler file meant to allow me to commit to the repo")

	// Database Connection
	dbUser := os.Getenv("DBUSER")
	dbPass := os.Getenv("DBPASS")
	dbIp := os.Getenv("DBIP")
	db, err := sql.Open("mysql", dbUser + ":" + dbPass + "@tcp(" + dbIp + ")/degreeroadmap")
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()
    fmt.Println("Success connecting to database.")

	// pingErr := db.Ping()
    // if pingErr != nil {
    //     panic(pingErr)
    // }
    // fmt.Println("Connected!")

	// Retreive value
	results, err := db.Query("SELECT id, prefix, number, name, level, historical_semester, core FROM Courses")
    if err !=nil {
        panic(err.Error())
    }
    for results.Next() {
        var table Course
        err = results.Scan(&table.id, &table.prefix, &table.number, &table.name, &table.level, &table.historical_semester, &table.core)
        if err != nil {
            panic(err.Error())
        }
        fmt.Println(table)
    }

}