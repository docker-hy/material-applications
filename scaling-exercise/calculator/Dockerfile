FROM node:16 as build

WORKDIR /usr/src/app

COPY package* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:16-alpine

ENV PORT 3000

RUN npm install -g serve

COPY --from=build /usr/src/app/build /usr/src/html

CMD serve -l $PORT /usr/src/html
