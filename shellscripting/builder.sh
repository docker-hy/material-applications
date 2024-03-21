#!/bin/sh
git clone https://github.com/${1}.git
echo $1 > temp.txt
cd $(cut -d "/" -f2 temp.txt)  
CONT_NAME=$2
docker build . -t ${CONT_NAME} 

#logged in to docker!
docker push ${CONT_NAME}:latest
#pushed! 





