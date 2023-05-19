FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY routes routes
COPY index index

EXPOSE 3000

CMD [ "npm", "start" ]