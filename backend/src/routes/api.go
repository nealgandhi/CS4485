package routes

import (
	"net/http"

	"github.com/capstone/backend/src/controllers"
	"github.com/capstone/backend/src/middleware"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/handlers"
)

func SetupRoutes() *gin.Engine {

	router := gin.Default()

	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Reached"})
	})

	router.GET("/get/course/:cprefix/:cnumber/prereqs", controllers.GetPrereqs)

	router.GET("/get/course/:cprefix/:cnumber/info", controllers.GetInfo)

	router.GET("/get/user/:email/semester/:semester/courses", controllers.GetUserSemesterCourses)
	router.POST("/post/user/:email/semester/:semester/courses", controllers.AddUserSemesterCourses)
	router.POST("/delete/user/:email/semester/:semester/courses", controllers.RemoveUserSemesterCourses)

	router.GET("/get/user/:email/semester/:semester/courseeligibility", controllers.VerifySemesterCourseEligibility)

	router.POST("/post/user/:email/degree/:id/password/:password", controllers.AddUser)
	router.GET("/get/user/:email/password/:password", controllers.GetUser)
	router.POST("/delete/user/:email/password/:password", controllers.RemoveUser)

	router.GET("/validate", middleware.ReequireAuth, controllers.Validate)

	router.POST("/post/user/:email/currentsemester", controllers.SetSemester)
	router.GET("/get/user/:email/currentsemester", controllers.GetSemester)

	router.POST("/post/user/:email/semester/:semester/generateplanadd", controllers.PlanAddCourse) //add course to be added to gen schedule
	router.POST("/post/user/:email/semester/:semester/generateplanremove", controllers.PlanRemoveCourse) //remove course to be added from gen schedule

	router.GET("/get/user/:email/semester/:semester/generateplancourses", controllers.GetPlanCourse) //check which courses are planned to be added 

	router.POST("/post/user/:email/semester/:semester/generatedropadd", controllers.DropAddCourse) //add course to be removed to gen schedule
	router.POST("/post/user/:email/semester/:semester/generatedropremove", controllers.DropRemoveCourse) //remove course to be removed from gen schedule

	router.GET("/get/user/:email/semester/:semester/generatedropcourses", controllers.GetDropCourse) //check which courses are planned to be removed

	router.GET("/get/user/:email/semester/:semester/generateverify", controllers.ValidateGenSchedule) //check if schedule changes are valid

	http.ListenAndServe(":8080",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(router))

	return router
}
