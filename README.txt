Fetch URL: https://github.com/techn0mad/express-app-ecs.git

I logged in to AWS and did the following:
- Went to the ECS service
- Created a cluster named "HelsinginYliopisto"
- Created a task that contained the "devopsdockeruh/coursepage" Docker image in the cluster
- Configured ECS to run the task as a manual service, using the Fargate hosting service
- Once the cluster and task were up, I went to the public IP at "35.93.100.238"
  to verify and view the course web page displayed by the Docker container

