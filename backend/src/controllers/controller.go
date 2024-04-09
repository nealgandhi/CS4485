package controllers

import (
	"log"
	"net/http"
	"strings"

	"github.com/capstone/backend/src/models"
	"github.com/capstone/backend/src/utils"
	"github.com/gin-gonic/gin"
)

func GetPrereqs(c *gin.Context) {
	cprefix := c.Param("cprefix")
	cnumber := c.Param("cnumber")
	results, err := utils.DB.Query("SELECT Courses.prefix, Courses.number FROM Courses, Prereqs WHERE Prereqs.prereq_id=Courses.id AND Prereqs.course_id IN (SELECT id FROM Courses WHERE prefix=\"" + cprefix + "\" AND number=" + cnumber + ")")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
		//panic(err.Error())
	}

	var prereqs []models.Course2
	for results.Next() {
		var row models.Course2
		err = results.Scan(&row.Prefix, &row.Number)
		if err != nil {
			panic(err.Error())
		}
		prereqs = append(prereqs, row)
	}

	c.JSON(http.StatusOK, gin.H{"prereqs": prereqs})
}

func GetInfo(c *gin.Context) {
	cprefix := c.Param("cprefix")
	cnumber := c.Param("cnumber")

	results, err := utils.DB.Query("SELECT id, prefix, number, name, level, historical_semester, core FROM Courses WHERE prefix=\"" + cprefix + "\" AND number=" + cnumber + "")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
		//panic(err.Error())
	}

	var cinfo models.CourseInfo

	for results.Next() {

		err = results.Scan(&cinfo.Id, &cinfo.Prefix, &cinfo.Number, &cinfo.Name, &cinfo.Level, &cinfo.Historical_semester, &cinfo.Core)
		if err != nil {
			panic(err.Error())
		}

	}

	classID := &cinfo.Id //Tests if class exists in databse and outputs error 401 if not
	log.Println(classID)
	if *classID == "" {
		c.AbortWithStatus(401)
		log.Println("Error 401: Class inputted not found in the database. Check your data and query.")
		return
	}

	c.JSON(http.StatusOK, gin.H{"info": cinfo})
}

func VerifySemesterCourseEligibility(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]

	results, err := utils.DB.Query("SELECT Count(Prereqs.prereq_id) FROM Prereqs, UserPlan WHERE Prereqs.course_id=UserPlan.course_id AND UserPlan.email=\"" + userEmail + "\" AND UserPlan.semester=\"" + semester + "\" AND Prereqs.prereq_id NOT IN (SELECT UserPlan.course_id FROM UserPlan WHERE semester < \"" + semester + "\")")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	type countResponse struct {
		count int
	}
	var structResponse countResponse
	for results.Next() {
		err = results.Scan(&structResponse.count)
		if err != nil {
			panic(err.Error())
		}
	}

	if structResponse.count == 0 {
		c.JSON(http.StatusOK, gin.H{"email": userEmail, "semester": semester, "eligible": 1})
		return
	}
	c.JSON(http.StatusOK, gin.H{"email": userEmail, "semester": semester, "eligible": 0})
}

func GetUserSemesterCourses(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester")

	results, err := utils.DB.Query("SELECT course_id FROM UserPlan WHERE email=\"" + userEmail + "\" and semester=\"" + semester + "\"")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	type courseId struct {
		CourseId string `json:"courseID"`
	}
	var semesterCourses []courseId

	for results.Next() {
		var row courseId
		err = results.Scan(&row.CourseId)
		if err != nil {
			panic(err.Error())
		}
		semesterCourses = append(semesterCourses, row)
	}

	c.JSON(http.StatusOK, gin.H{"email": userEmail, "semester": semester, "courses": semesterCourses})

}

// Expects post data like: courses=cs1111,cs2222,cs3333,etc
func AddUserSemesterCourses(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlInsertString := "INSERT INTO UserPlan VALUES "
	for i, s := range courses {
		sqlInsertString += "(\"" + userEmail + "\",\"" + semester + "\",\"" + s + "\")"
		if i < len(courses)-1 {
			sqlInsertString += ","
		}
	}
	_, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

// Expects post data like: courses=cs1111,cs2222,cs3333,etc
func RemoveUserSemesterCourses(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlDeleteString := "DELETE FROM UserPlan WHERE email=\"" + userEmail + "\" AND semester=\"" + semester + "\" AND course_id IN ("
	for i, s := range courses {
		sqlDeleteString += "\"" + s + "\""
		if i < len(courses)-1 {
			sqlDeleteString += ","
		}
	}
	sqlDeleteString += ")"

	_, err := utils.DB.Query(sqlDeleteString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

// inserts user into DB with email and degree id
func AddUser(c *gin.Context) {
	userEmail := c.Param("email")
	id := c.Param("id")

	sqlInsertString := "INSERT INTO Users VALUES (\"" + userEmail + "\",\"" + id + "\")"

	_, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

func GetUser(c *gin.Context) {
	userEmail := c.Param("email")

	results, err := utils.DB.Query("SELECT email, degree_id FROM Users WHERE email=\"" + userEmail + "\"")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	var uinfo models.UserInfo

	for results.Next() {

		err = results.Scan(&uinfo.Email, &uinfo.Id)
		if err != nil {
			panic(err.Error())
		}

	}

	uEmail := &uinfo.Email //Tests if user exists in databse and outputs error 401 if not
	if *uEmail == "" {
		c.AbortWithStatus(401)
		log.Println("Error 401: User not found in the database. Check your data and query.")
		return
	}

	c.JSON(http.StatusOK, gin.H{"info": uinfo})
}
