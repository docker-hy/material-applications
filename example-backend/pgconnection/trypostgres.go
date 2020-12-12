package pgconnection

import (
	"context"
	"errors"
	"fmt"
	"os"
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

func FallbackString(value, fallback string) string {
	if len(value) == 0 {
		return fallback
	}

	return value
}

// createSchema creates database schema for User and Story models.
func createSchema() error {
	err := pgdb.Model((*Message)(nil)).CreateTable(&orm.CreateTableOptions{
		Temp: true,
	})
	return err
}

// TryPostgres tests postgres connection, returns boolean and possibly error
func TryPostgres() (bool, error) {
	if pgdb == nil {
		InitializePostgresClient(ctx)
	}

	message := new(Message)
	err := pgdb.Model(message).
		Where("body = ?", "pong").
		Select()

	if err != nil {
		fmt.Println(err)
		return false, errors.New("No postgres, check backend output for additional info")
	}

	fmt.Println(message)

	return message.Body == "pong", err
}

// InitializePostgresClient checks for the connection
func InitializePostgresClient(ctx context.Context) {
	postgresHost := os.Getenv("POSTGRES_HOST")
	postgresUser := FallbackString(os.Getenv("POSTGRES_USER"), "postgres")
	postgresPassword := FallbackString(os.Getenv("POSTGRES_PASSWORD"), "postgres")
	postgresDatabase := FallbackString(os.Getenv("POSTGRES_DATABASE"), "postgres")

	if len(postgresHost) == 0 {
		fmt.Println("[Ex 2.X+] POSTGRES_HOST env was not passed so postgres connection is not initialized")
		return
	}

	postgresAddr := postgresHost + ":5432"

	fmt.Println(`[Ex 2.X+] Initializing postgres connection with envs
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

	for i := 0; i <= 4; i++ {
		err := pgdb.Ping(ctx)
		if err == nil {
			createSchema()
			message := &Message{
				Body: "pong",
			}
			pgdb.Model(message).Insert()
			fmt.Println("[Ex 2.X+] Connection to postgres initialized, ready to ping pong.")
			break
		}
		if i < 4 {
			fmt.Println("[Ex 2.X+] Connection to postgres failed! Retrying...")
			time.Sleep(2 * time.Second)
		} else {
			fmt.Print("[Ex 2.X+] Failing to connect to postgres. The error is:\n", err, "\n\n")
		}
	}
}

func GetPGDB() (*pg.DB, context.Context) {
	return pgdb, ctx
}
