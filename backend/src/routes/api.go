package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {

	router := gin.Default()

	router.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Reached"})
	})

	router.GET("/insert", func(c *gin.Context) { //POST
		c.JSON(http.StatusOK, gin.H{"message": "Insert course not yet implemented"})
	})

	router.GET("/update", func(c *gin.Context) { //PATCH
		c.JSON(http.StatusOK, gin.H{"message": "Update course not yet implemented"})
	})

	router.GET("/delete", func(c *gin.Context) { //DELETE
		c.JSON(http.StatusOK, gin.H{"message": "Delete course not yet implemented"})
	})

	router.GET("/get/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Get course by ID not yet implemented"})
	})

	return router
}

