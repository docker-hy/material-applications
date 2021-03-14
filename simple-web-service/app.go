package main

import (
	"encoding/base64"
	"fmt"
	"os"
	"path/filepath"
	"server"
	"strings"
	"time"
)

func includes(a []string, x string) bool {
	for _, n := range a {
			if x == n {
					return true
			}
	}
	return false
}

func writeToFile(textToWrite string) {
	path, pathErr := filepath.Abs("text.log")
	file, fileErr := os.OpenFile(path, os.O_RDWR|os.O_APPEND|os.O_CREATE, 0644)
	if fileErr != nil || pathErr != nil  {
			fmt.Println(pathErr)
			fmt.Println(fileErr)
			return
	}
	defer file.Close()

	file.WriteString(textToWrite + "\n")
	fmt.Println("Wrote text to " + path)
}

func main() {
	args := os.Args[1:]

	if (includes(args, "server")) {
		server.Start()
		return
	}

	if (includes(args, "--help") || len(args) != 0) {
		fmt.Println(`
		
		The application accepts 1 argument "server". Use the argument server to run the server

		If no arguments are supplied the application will output log strings to a file.

		`)
		fmt.Println("Arguments given: " + strings.Join(args, " "))
		return
	}


	fmt.Println("Starting log output")
	counter := 0
	for {
		timestamp := time.Now().Round(time.Second).UTC().String()
		writeToFile(timestamp)
		time.Sleep(2 * time.Second)
		counter++
		if counter == 5 {
			message, _ := base64.StdEncoding.DecodeString("U2VjcmV0IG1lc3NhZ2UgaXM6ICdZb3UgY2FuIGZpbmQgdGhlIHNvdXJjZSBjb2RlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kb2NrZXItaHkn")
			writeToFile(string(message))
			counter = 0
		}
	}
}