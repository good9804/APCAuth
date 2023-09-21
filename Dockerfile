# build stage
FROM node:lts-alpine 
RUN npx update-browserslist-db@latest
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
