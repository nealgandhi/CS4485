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

	router.GET("/validate/:token", middleware.ReequireAuth, controllers.Validate)

	http.ListenAndServe(":8080",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(router))

	return router
}
