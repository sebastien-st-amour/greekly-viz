FROM node:16.13.1-alpine


COPY ./client /app/client
COPY ./services /app/services
COPY ./index.js /app/index.js
COPY ./package.json /app/package.json

WORKDIR /app/client

RUN yarn build

WORKDIR /app
RUN npm install

CMD [ "yarn", "start" ]