package routes

import (
	"net/http"

	"github.com/capstone/backend/src/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {

	router := gin.Default()

	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Reached"})
	})

	router.GET("/get/course/:cprefix/:cnumber/prereqs", controllers.GetPrereqs)

	router.GET("/get/course/:cprefix/:cnumber/info", controllers.GetInfo)

	http.HandleFunc("/get/test", controllers.GetInfoTest)

	return router
}
