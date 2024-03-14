# syntax=docker/dockerfile:1

FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD npm start