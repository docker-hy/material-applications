package cache

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client
var ctx = context.Background()

// TryRedis tests redis connection, returns boolean and possibly error
func TryRedis() (bool, error) {
	if rdb == nil {
		err := InitializeRedisClient()
		if (err != nil) {
			return false, errors.New("[Ex 2.4+] Unable to create connection to redis")
		}
	}
	val, err := rdb.Get(ctx, "ping").Result()
	if err == redis.Nil {
		fmt.Println("[Ex 2.4+] Unexpectedly ping does not exist")
	} else if err != nil {
		fmt.Println(err)
		return false, errors.New("[Ex 2.4+] No redis, check backend output for additional info")
	}

	fmt.Println("ping", val)
	return true, nil
}

// InitializeRedisClient sets the initial value for the try
func InitializeRedisClient() error {
	redisHost := os.Getenv("REDIS_HOST")
	if len(redisHost) == 0 {
		return errors.New("[Ex 2.4+] REDIS_HOST env was not passed so redis connection is not initialized")
	}

	fmt.Println("[Ex 2.4+] Initializing redis client")

	redisAddr := redisHost + ":6379"

	rdb = redis.NewClient(&redis.Options{
		Addr: redisAddr,
	})

	for i := 0; i <= 4; i++ {
		err := rdb.Set(ctx, "ping", "pong", 0).Err()
		if err == nil {
			fmt.Println("[Ex 2.4+] Connection to redis initialized, ready to ping pong.")
			break
		}
		if i < 4 {
			fmt.Println("[Ex 2.4+] Connection to redis failed! Retrying...")
			time.Sleep(2 * time.Second)
		} else {
			return errors.New("[Ex 2.4+] Failing to connect to redis in "+redisAddr+". The error is:\n" + err.Error())
		}
	}
	return nil
}
