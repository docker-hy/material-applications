FROM node:16

WORKDIR /usr/app

COPY package* .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "."] 