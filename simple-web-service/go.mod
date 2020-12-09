module simple-web-service

go 1.15

replace server => ./server

require (
	github.com/gin-gonic/gin v1.6.3
	server v0.0.0-00010101000000-000000000000
)
