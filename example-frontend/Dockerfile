FROM ubuntu:latest

WORKDIR "/usr/src/project"

RUN apt update && apt install curl -y

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash && apt install -y nodejs

COPY package.json .

RUN npm install --no-audit --engine-strict=false --force

COPY . .

RUN npm run build

EXPOSE 5001

RUN npm install -g serve

CMD ["serve", "-s", "-l", "tcp://0.0.0.0:5001", "build"]



