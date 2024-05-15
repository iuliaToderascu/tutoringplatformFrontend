FROM node:21-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY ./.nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /etc/nginx/html/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
