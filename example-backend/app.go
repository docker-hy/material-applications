package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

// FallbackString returns the second string if the first is empty. For ENVs
func FallbackString(value, fallback string) string {
	if (len(value) == 0) {
		return fallback
	}

	return value
}

func pingpong(context *gin.Context) {

	redis := context.Query("redis") == "true"
	postgres := context.Query("postgres") == "true"

	if (redis) {
		_, err := TryRedis()
		if (err != nil) {
			context.String(http.StatusNotImplemented, err.Error())
			return
		}
		context.String(http.StatusOK, "pong")
		return
	}
	if (postgres) {
		_, err := TryPostgres()
		if (err != nil) {
			context.String(http.StatusNotImplemented, err.Error())
			return
		}
		context.String(http.StatusOK, "pong")
		return
	}

	context.String(http.StatusOK, "pong")
}


// Start server
func main() {
	port := FallbackString(os.Getenv("PORT"), "8080")
	allowedOrigin := FallbackString(os.Getenv("REQUEST_ORIGIN"), "https://example.com")
	InitializeRedisClient()
	InitializePostgresClient()

	config := cors.DefaultConfig()

	config.AllowOrigins = []string{allowedOrigin}

	router := gin.Default()

	router.Use(cors.New(config))

	router.GET("/ping", pingpong)

	router.GET("/messages", GetMessages)
	router.POST("/messages", CreateMessage)

	router.NoRoute(func(context *gin.Context) {
		path := context.Request.URL.Path
		context.String(404, "The only API of this app is /ping. Request received to path " + path + " and this resulted in 404.")
	})

	router.Run(":" + port)
}