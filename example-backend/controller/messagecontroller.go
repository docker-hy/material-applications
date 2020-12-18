package controller

import (
	"fmt"
	"server/pgconnection"

	"github.com/gin-gonic/gin"
)

// Message is a simple message with a body
type Message struct {
	ID   int64  `json:"id"`
	Body string `json:"body"`
}

// GetMessages adds all messages in database to the body of the response
func GetMessages(context *gin.Context) {
	pgdb, ctx := pgconnection.GetPGDB()
	err := pgdb.Ping(ctx)
	if err != nil {
		fmt.Println("Postgres connection not established")
		context.Status(501)
		return
	}

	var messages []Message
	err = pgdb.Model(&messages).Select()

	if err != nil {
		context.String(500, err.Error())
		return
	}

	context.JSON(200, gin.H{
		"messages": messages,
	})
}

// CreateMessage adds message to database and the same message to the message body of the response
func CreateMessage(context *gin.Context) {
	pgdb, ctx := pgconnection.GetPGDB()

	err := pgdb.Ping(ctx)
	if err != nil {
		fmt.Println("Postgres connection not established")
		context.Status(501)
		return
	}

	var message Message
	context.BindJSON(&message)
	_, err = pgdb.Model(&message).Insert()

	if err != nil {
		context.String(500, err.Error())
		return
	}

	context.JSON(200, gin.H{
		"message": message,
	})
}
