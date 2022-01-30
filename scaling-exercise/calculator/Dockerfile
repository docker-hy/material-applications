FROM node:16

WORKDIR /usr/app

COPY . .
RUN npm ci && npm run build

EXPOSE 3000

CMD ["npm", "start"] 