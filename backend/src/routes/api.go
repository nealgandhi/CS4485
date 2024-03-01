package routes

import (
	"log"
	"net/http"

	"github.com/capstone/backend/src/utils"
	"github.com/gin-gonic/gin"
)

type Course2 struct {
	Prefix string `json:"prefix"`
	Number int `json:"number"`
}

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

	router.GET("/get/course/:cprefix/:cnumber/prereqs", func(c *gin.Context) {
		cprefix := c.Param("cprefix")
		cnumber := c.Param("cnumber")
		results, err := utils.DB.Query("SELECT Courses.prefix, Courses.number FROM Courses, Prereqs WHERE Prereqs.prereq_id=Courses.id AND Prereqs.course_id IN (SELECT id FROM Courses WHERE prefix=\""+cprefix+"\" AND number="+cnumber+")")
		if err != nil {
			c.AbortWithStatus(400)
			log.Println(err)
			return
			//panic(err.Error())
		}

		var prereqs []Course2
		for results.Next() {
			var row Course2
			err = results.Scan(&row.Prefix, &row.Number)
			if err != nil {
				panic(err.Error())
			}
			prereqs = append(prereqs, row)
		}

		c.JSON(http.StatusOK, gin.H {"prereqs": prereqs})
	})

	return router
}

