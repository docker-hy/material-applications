package pgconnection

import (
	"context"
	"errors"
	"fmt"
	"os"
	"server/common"
	"time"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

var pgdb *pg.DB
var ctx = context.Background()

type Message struct {
	ID   int64  `json:"id"`
	Body string `json:"body"`
}

// createSchema creates database schema for User and Story models.
func createSchema() error {
	err := pgdb.Model((*Message)(nil)).CreateTable(&orm.CreateTableOptions{
		Temp: false,
	})
	return err
}

// TryPostgres tests postgres connection, returns boolean and possibly error
func TryPostgres() (bool, error) {
	if pgdb == nil {
		err := InitializePostgresClient()
		if (err != nil) {
			return false, errors.New("[Ex 2.6+] Unable to create connection to postgres")
		}
	}

	message := new(Message)
	err := pgdb.Model(message).
		Where("body = ?", "pong").
		Limit(1).
		Select()

	if err != nil {
		fmt.Println(err)
		return false, errors.New("[Ex 2.6+] No postgres, check backend output for additional info")
	}

	fmt.Println(message)

	return message.Body == "pong", err
}

// InitializePostgresClient checks for the connection
func InitializePostgresClient() error {
	postgresHost := os.Getenv("POSTGRES_HOST")
	postgresUser := common.FallbackString(os.Getenv("POSTGRES_USER"), "postgres")
	postgresPassword := common.FallbackString(os.Getenv("POSTGRES_PASSWORD"), "postgres")
	postgresDatabase := common.FallbackString(os.Getenv("POSTGRES_DATABASE"), "postgres")

	if len(postgresHost) == 0 {
		return errors.New("[Ex 2.6+] POSTGRES_HOST env was not passed so postgres connection is not initialized")
	}

	postgresAddr := postgresHost + ":5432"

	fmt.Println(`[Ex 2.6+] Initializing postgres connection with envs
		POSTGRES_HOST      ` + postgresHost + `,
		POSTGRES_USER:     ` + postgresUser + `,
		POSTGRES_PASSWORD: ` + postgresPassword + `,
		POSTGRES_DATABASE: ` + postgresDatabase + `
		to ` + postgresAddr)

	pgdb = pg.Connect(&pg.Options{
		Addr:     postgresAddr,
		User:     postgresUser,
		Password: postgresPassword,
		Database: postgresDatabase,
	})

	for i := 0; i <= 10; i++ {
		err := pgdb.Ping(ctx)
		if err == nil {
			createSchema()
			message := &Message{
				Body: "pong",
			}
			pgdb.Model(message).Insert()
			fmt.Println("[Ex 2.6+] Connection to postgres initialized, ready to ping pong.")
			break
		}
		if i < 10 {
			fmt.Println("[Ex 2.6+] Connection to postgres failed! Retrying...")
			time.Sleep(5 * time.Second)
		} else {
			return errors.New("[Ex 2.6+] Failing to connect to postgres. The error is:\n" + err.Error())
		}
	}

	return nil
}

func GetPGDB() (*pg.DB, context.Context) {
	return pgdb, ctx
}
