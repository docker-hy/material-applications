FROM node

WORKDIR /usr/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["node", "./index.js"] 