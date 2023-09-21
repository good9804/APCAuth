# build stage
FROM node:lts-alpine 

WORKDIR /app
COPY . .

WORKDIR /app/front
RUN npm install
RUN npm install @popperjs/core
RUN npx browserslist@latest --update-db
RUN npm run build

WORKDIR /app/back
COPY package*.json ./
COPY package-lock*.json ./
RUN npm install
RUN npm i iconv-lite
EXPOSE 3000

CMD ["npm","start"]
