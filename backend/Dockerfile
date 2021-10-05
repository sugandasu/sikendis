FROM node:16.4.2

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env.example .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 4000

CMD [ "node", "dist/index.js" ]

USER node