# syntax=docker/dockerfile:1

FROM node:lts-alpine AS install

WORKDIR /usr/src/app

COPY . .

RUN npm ci


FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY --from=install /usr/src/app .

ENV CI=true

RUN npm run build


# serve
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html