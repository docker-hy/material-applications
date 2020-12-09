package main

import (
	"os"
	"fmt"
	"time"
	"server"
	"strings"
	"path/filepath"
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
	for {
		timestamp := time.Now().Round(time.Second).UTC().String()
		writeToFile(timestamp)
		time.Sleep(2 * time.Second)
	}
}