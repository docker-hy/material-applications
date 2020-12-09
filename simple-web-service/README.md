## Simple web service ##

This application is used for many of the exercises in https://devopswithdocker.com as an application which students can use to test out different features of containers.

These include the following. Bolded is the feature of the app and after it the learning experience:

**App accepts arguments**

CMD
docker run XXX command

**App generates content to a file**

docker exec
docker cp
volumes

**App starts a web server**

docker run -p
volumes 

**App accepts PORT env and respects it**

heroku deploy