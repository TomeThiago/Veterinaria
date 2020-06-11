FROM node:alpine

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD [ "npm", "start" ]