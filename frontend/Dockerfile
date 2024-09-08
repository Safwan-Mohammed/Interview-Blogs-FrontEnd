FROM node:22-alpine3.20

WORKDIR /usr/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview","--","--port","4173","--host"]