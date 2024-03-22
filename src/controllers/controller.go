package controllers

import (
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/capstone/backend/src/utils"
	"github.com/capstone/backend/src/models"
)

func GetPrereqs(c *gin.Context) {
	cprefix := c.Param("cprefix")
	cnumber := c.Param("cnumber")
	results, err := utils.DB.Query("SELECT Courses.prefix, Courses.number FROM Courses, Prereqs WHERE Prereqs.prereq_id=Courses.id AND Prereqs.course_id IN (SELECT id FROM Courses WHERE prefix=\""+cprefix+"\" AND number="+cnumber+")")
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

	c.JSON(http.StatusOK, gin.H {"prereqs": prereqs})
}

func GetInfo(c *gin.Context) {
	cprefix := c.Param("cprefix")
	cnumber := c.Param("cnumber")

	results, err := utils.DB.Query("SELECT id, prefix, number, name, level, historical_semester, core FROM Courses WHERE prefix=\""+cprefix+"\" AND number="+cnumber+"")
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

	c.JSON(http.StatusOK, gin.H {"info": cinfo})
}

