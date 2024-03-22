package routes

import (

	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/capstone/backend/src/controllers"

)

func SetupRoutes() *gin.Engine {

	router := gin.Default()

	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Reached"})
	})

	router.GET("/get/course/:cprefix/:cnumber/prereqs", controllers.GetPrereqs)

	router.GET("/get/course/:cprefix/:cnumber/info", controllers.GetInfo)

	return router
}

