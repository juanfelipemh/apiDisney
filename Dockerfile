FROM node:20

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ENV NODE_ENV docker
CMD [ "npm", "start" ]

