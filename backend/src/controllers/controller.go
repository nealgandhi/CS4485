package controllers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/capstone/backend/src/models"
	"github.com/capstone/backend/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
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

func GetUserCourses(c *gin.Context) {
	userEmail := c.Param("email")
	semesters := [...]string{"2024.1", "2023.3", "2023.1", "2022.3", "2022.1", "2021.3", "2021.1", "2020.3"}

	reply := gin.H{"email": userEmail}

	for _, semester := range semesters {
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

		reply[semester] = semesterCourses
	}

	c.JSON(http.StatusOK, reply)

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
	pw := c.Param("password")

	//encryptes pass
	hash, passErr := bcrypt.GenerateFromPassword([]byte(pw), 10)
	if passErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	sqlInsertString := "INSERT INTO Users VALUES (\"" + userEmail + "\",\"" + id + "\",\"" + string(hash) + "\", null, null)"

	_, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

func GetUser(c *gin.Context) {
	userEmail := c.Param("email")
	pw := c.Param("password")

	results, err := utils.DB.Query("SELECT email, degree_id, password FROM Users WHERE email=\"" + userEmail + "\"")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	var uinfo models.UserInfo

	for results.Next() {

		err = results.Scan(&uinfo.Email, &uinfo.Id, &uinfo.Password)
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

	//checks if hashed password matches
	decryptError := bcrypt.CompareHashAndPassword([]byte(uinfo.Password), []byte(pw))
	if decryptError != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	//Generate jwt token for authentication
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": uEmail,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	//sign and get token as string
	tokenString, tokenErr := token.SignedString([]byte(os.Getenv("SECRETKEY")))
	if tokenErr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{"info": uinfo, "token": tokenString})
}

func RemoveUser(c *gin.Context) {
	userEmail := c.Param("email")
	pw := c.Param("password")

	results, err := utils.DB.Query("SELECT email, degree_id, password FROM Users WHERE email=\"" + userEmail + "\"")
	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	var uinfo models.UserInfo

	for results.Next() {

		err = results.Scan(&uinfo.Email, &uinfo.Id, &uinfo.Password)
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

	decryptError := bcrypt.CompareHashAndPassword([]byte(uinfo.Password), []byte(pw))
	if decryptError != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	sqlDeleteString := "DELETE FROM Users WHERE email=\"" + userEmail + "\""

	_, err = utils.DB.Query(sqlDeleteString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"email": user.(models.UserInfo).Email,
	})
}

func SetSemester(c *gin.Context) {
	userEmail := c.Param("email")
	currentsemester := c.PostForm("currentsemester")

	sqlInsertString := "UPDATE Users SET current_semester = " + currentsemester + " WHERE email=\"" + userEmail + "\""

	fmt.Print(sqlInsertString)

	_, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}
}

func GetSemester(c *gin.Context) {
	userEmail := c.Param("email")

	sqlInsertString := "SELECT current_semester FROM Users WHERE email=\"" + userEmail + "\""

	fmt.Print(sqlInsertString)

	results, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}

	var currentsemester int

	if results.Next() {
		err = results.Scan(&currentsemester)
		if err != nil {
			panic(err.Error)
		}
	}

	c.JSON(http.StatusOK, gin.H{"currentsemester": currentsemester})

}

func PlanAddCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlInsertString := "INSERT INTO UserPlanChanges (email, semester, course_to_add) VALUES "
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

func PlanRemoveCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlDeleteString := "DELETE FROM UserPlanChanges WHERE email=\"" + userEmail + "\" AND semester=\"" + semester + "\" AND course_to_add IN ("
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

func GetPlanCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester")

	results, err := utils.DB.Query("SELECT course_to_add FROM UserPlanChanges WHERE email=\"" + userEmail + "\" and semester=\"" + semester + "\"")

	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	type courseId struct {
		CourseId sql.NullString `json:"courseID"`
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

func DropAddCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlInsertString := "INSERT INTO UserPlanChanges (email, semester, course_to_remove) VALUES "
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

func DropRemoveCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]
	courses := strings.Split(c.PostForm("courses"), ",")

	sqlDeleteString := "DELETE FROM UserPlanChanges WHERE email=\"" + userEmail + "\" AND semester=\"" + semester + "\" AND course_to_remove IN ("
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

func GetDropCourse(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester")

	results, err := utils.DB.Query("SELECT course_to_remove FROM UserPlanChanges WHERE email=\"" + userEmail + "\" and semester=\"" + semester + "\"")

	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	type courseId struct {
		CourseId sql.NullString `json:"courseID"`
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

func ValidateGenSchedule(c *gin.Context) {
	userEmail := c.Param("email")
	semester := c.Param("semester") // format (str): [YYYY].[Semester ID: 1 for spring, 2 for summer, 3 for fall]

	sqlInsertString := "SELECT current_semester FROM Users WHERE email=\"" + userEmail + "\""

	results, err := utils.DB.Query(sqlInsertString)
	if err != nil {
		c.AbortWithStatus(400)
		log.Panicln(err)
		return
	}

	var usersemester int

	if results.Next() {
		err = results.Scan(&usersemester)
		if err != nil {
			panic(err.Error)
		}
	}
	type courseId struct {
		CourseId sql.NullString `json:"courseID"`
	}

	results, err = utils.DB.Query("SELECT course_id FROM DegreeRecommendedCourses WHERE semester=\"" + strconv.Itoa(usersemester) + "\" and course_type=\"R\"")

	var semesterCourses []courseId

	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	for results.Next() {
		var row courseId
		err = results.Scan(&row.CourseId)
		if err != nil {
			panic(err.Error())
		}
		semesterCourses = append(semesterCourses, row)
	}

	results, err = utils.DB.Query("SELECT course_to_add FROM UserPlanChanges WHERE email=\"" + userEmail + "\" and semester=\"" + semester + "\"")

	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	for results.Next() {
		var row courseId
		err = results.Scan(&row.CourseId)
		if err != nil {
			panic(err.Error())
		}
		for i := 0; i < len(semesterCourses); i++ {
			if row.CourseId == semesterCourses[i].CourseId {
				break
			}
			if i == len(semesterCourses)-1 {
				semesterCourses = append(semesterCourses, row)
			}
		}
	}

	results, err = utils.DB.Query("SELECT course_to_remove FROM UserPlanChanges WHERE email=\"" + userEmail + "\" and semester=\"" + semester + "\"")

	if err != nil {
		c.AbortWithStatus(400)
		log.Println(err)
		return
	}

	for results.Next() {
		var row courseId
		err = results.Scan(&row.CourseId)
		if err != nil {
			panic(err.Error())
		}
		for i := 0; i < len(semesterCourses); i++ {
			if row.CourseId == semesterCourses[i].CourseId {
				fmt.Print("REMOVE")
				if i == len(semesterCourses)-1 {
					semesterCourses = semesterCourses[:len(semesterCourses)-1]
				} else {
					semesterCourses = append(semesterCourses[:i], semesterCourses[i+1:]...)
				}
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{"email": userEmail, "semester": semester, "eligible": 1, "courses": semesterCourses})

}
