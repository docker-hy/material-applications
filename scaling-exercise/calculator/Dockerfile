FROM node

WORKDIR /usr/app

COPY . .
RUN npm ci && npm run build

EXPOSE 3000

CMD ["npm", "start"] 