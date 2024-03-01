package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Course struct {
    id int `json:"id"`
	prefix string `json:"prefix"`
	number int `json:"number"`
	name string `json:"name"`
	level string `json:"level"`
	historical_semester string `json:"historical_semester"`
	core string `json:"core"`
}

type Course2 struct {
	Prefix string `json:"prefix"`
	Number int `json:"number"`
}


func main() {
	// Database Connection
	dbUser := os.Getenv("DBUSER")
	dbPass := os.Getenv("DBPASS")
	dbIp := os.Getenv("DBIP")
	db, err := sql.Open("mysql", dbUser + ":" + dbPass + "@tcp(" + dbIp + ")/degreeroadmap")
    if err != nil {
        panic(err.Error())
    }
    defer db.Close()
    fmt.Println("Success connecting to database.")

	// pingErr := db.Ping()
    // if pingErr != nil {
    //     panic(pingErr)
    // }
    // fmt.Println("Connected!")

	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./views", true)))

	api := router.Group("/api") 
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H {
				"message": "Reached",
			})
		})

		api.GET("/course/:cprefix/:cnumber/prereqs", func(c *gin.Context) {
			cprefix := c.Param("cprefix")
			cnumber := c.Param("cnumber")
			results, err := db.Query("SELECT Courses.prefix, Courses.number FROM Courses, Prereqs WHERE Prereqs.prereq_id=Courses.id AND Prereqs.course_id IN (SELECT id FROM Courses WHERE prefix=\""+cprefix+"\" AND number="+cnumber+")")
			if err != nil {
				c.AbortWithStatus(400)
				fmt.Println(err)
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
	}

	router.Run("0.0.0.0:8080")	

}