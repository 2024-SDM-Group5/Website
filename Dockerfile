FROM node:20
COPY ./ .
RUN yarn install

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "dev", "-p", "8080"]
