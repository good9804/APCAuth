# build stage
FROM node:lts-alpine 

WORKDIR /app
COPY . .

WORKDIR /app/front
RUN npm install

RUN npm run build

WORKDIR /app/back
RUN npm install

EXPOSE 3000

CMD ["npm","start"]
