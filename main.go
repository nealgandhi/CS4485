package main

import (
	"fmt"

	"github.com/capstone/backend/src/routes"
	"github.com/capstone/backend/src/utils"
)

func main() {

	fmt.Print("\nLoading Enviorment Variables\n")
	utils.LoadEnv()
	fmt.Print("\nLoading Database\n")
	utils.LoadDatabase()

	fmt.Print("\nLoading Routes\n")
	router := routes.SetupRoutes()
	fmt.Print("\nLaunching Backend\n")
	router.Run()

}
