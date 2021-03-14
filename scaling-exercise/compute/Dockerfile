FROM node:14

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["node", "./index.js"] 