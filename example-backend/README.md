# backend-example-docker

This project is created to help learn docker configurations for backend projects. Student has to figure out how to construct their configuration based on the README. However, there are some additional helpers added in the README and in the exercise description.

# Prerequisites for development

Install [golang](https://golang.org/doc/install) 1.16

# Build project #

Run `go build`. It will generate a binary named "server"

# Test project #

Run tests with `go test ./...`.

# Execute project #

Execute the file e.g. `./server`.

> In exercise 1.12 and after you will need to add some environment variables. Not everything is important for all exercises and some may be useless.

Server accepts the following environment variables:

- `PORT` to choose which port for the application. Default: 8080

- In 1.12 and after
  - `REQUEST_ORIGIN` to pass an url through the cors check. Default: https://example.com

- In 2.4 and after
  - `REDIS_HOST` The hostname for redis. (port will default to 6379, the default for Redis)

- In 2.6 and after
  - `POSTGRES_HOST` The hostname for postgres database. (port will default to 5432 the default for Postgres)
  - `POSTGRES_USER` database user. Default: postgres
  - `POSTGRES_PASSWORD` database password. Default: postgres
  - `POSTGRES_DATABASE` database name. Default: postgres
