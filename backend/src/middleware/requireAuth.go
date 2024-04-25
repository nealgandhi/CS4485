package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/capstone/backend/src/models"
	"github.com/capstone/backend/src/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func ReequireAuth(c *gin.Context) {
	//Gets token
	tokenString := c.Param("token")

	//Decode token and validate
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRETKEY")), nil
	})
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		//check exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//get user
		results, err := utils.DB.Query("SELECT email, degree_id, password FROM Users WHERE email=\"" + claims["sub"].(string) + "\"")
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

		//attach to request
		c.Set("user", uinfo)

	} else {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	c.Next()
}
