FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx sequelize db:create

RUN npx sequelize db:migrate

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]