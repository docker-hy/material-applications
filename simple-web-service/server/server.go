package server

import (
	"github.com/gin-gonic/gin"
	"os"
)

func fallbackString(value, fallback string) string {
	if (len(value) == 0) {
		return fallback
	}

	return value
}

// Start server
func Start() {
	router := gin.Default()
	port := fallbackString(os.Getenv("PORT"), "8080")

	router.GET("/*path", func(context *gin.Context) {
		path := context.Param("path")
		context.JSON(200, gin.H{
			"message": "You connected to the following path: " + path,
			"path": path,
		})
	})

	router.Run(":" + port)
}