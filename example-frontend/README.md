# example-frontend

This project is created to help learn docker configurations for frontend projects. The README starting from "Prerequisites" is written without Docker in mind so student has to figure out how to construct their configuration based on the README. However, there are some additional helpers added in the README and in the exercise description.

# Prerequisites

Install [node](https://nodejs.org/en/download/). 

Example node install instructions for LTS node 10.x:
```
curl -sL https://deb.nodesource.com/setup_10.x | bash
sudo apt install -y nodejs
```

Check your install with `node -v && npm -v`

Install all packages with `npm install`

# Starting in production mode

Notice, that all the information are not needed in all the exercises.

## Exercise 1.10 -> to run the project

To build and serve in production mode: `npm start`
This builds the project to `dist` folder and serves it in port 5000.

You can alternatively build the project with `npm run build` to build the project to `dist` folder and then serve it in any way you want, for example:

To use a npm package called serve to serve the project in port 5000:
- install: `npm install -g serve`
- serve: `serve -s -l 5000 dist`

Test that the project is running by going to <http://localhost:5000>

## Exercise 1.12 -> to connect to backend

By default the expected path to backend is /api. This is where the application will send requests. 
To manually configure api path run with `API_URL` environment value set, for example `API_URL=http://localhost:8888 npm start` or `API_URL=<url> npm build`
