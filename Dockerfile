FROM node:20
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
COPY ./ /home/node/app
WORKDIR /home/node/app
RUN yarn install
RUN yarn run build

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "start", "-p", "8080"]
