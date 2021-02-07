package main

import (
	"os"
	"server/common"
	"server/router"
)

// Start server
func main() {
	port := common.FallbackString(os.Getenv("PORT"), "8080")
	router.Router().Run(":" + port)
}
