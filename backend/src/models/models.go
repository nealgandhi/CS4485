package models

import (
	"database/sql"

	"gorm.io/gorm"
)

type Course2 struct {
	Prefix string `json:"prefix"`
	Number int    `json:"number"`
}

type CourseInfo struct {
	Id                  string         `json:"id"`
	Prefix              string         `json:"prefix"`
	Number              int            `json:"number"`
	Name                string         `json:"name"`
	Level               string         `json:"level"`
	Historical_semester string         `json:"historical_semester"`
	Core                sql.NullString `json:"core"`
}

type UserInfo struct {
	Email    string `json:"email"`
	Id       string `json:"id"`
	Password string `json:"password"`
}

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Id       string
	Password string
}
