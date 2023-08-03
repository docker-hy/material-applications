FROM ubuntu:18.04 

WORKDIR /usr/src/app

EXPOSE 5000

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt install -y nodejs

COPY . .

RUN npm install

CMD node index.js