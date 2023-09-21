# build stage
FROM node:18.16.0

WORKDIR /app
COPY . .

WORKDIR /app/front
RUN npm install
RUN npm install @popperjs/core
RUN npm run build

WORKDIR /app/back
COPY package*.json ./
COPY package-lock*.json ./
RUN npm install
RUN npm i iconv-lite
EXPOSE 3000

CMD ["npm","start"]
