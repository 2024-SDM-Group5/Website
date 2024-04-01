FROM node:20
COPY ./ .
RUN yarn install
RUN yarn run build

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "start", "-p", "8080"]
