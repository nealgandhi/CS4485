package models

type Course2 struct {
	Prefix string `json:"prefix"`
	Number int `json:"number"`
}

type CourseInfo struct {
	Id int `json:"id"`
	Prefix string `json:"prefix"`
	Number int `json:"number"`
	Name string `json:"name"`
	Level string `json:"level"`
	Historical_semester string `json:"historical_semester"`
	Core string `json:"core"`
}
