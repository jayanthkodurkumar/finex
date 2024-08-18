FROM node:22-alpine3.19

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install


EXPOSE 5000
 
CMD ["node","index.js"]