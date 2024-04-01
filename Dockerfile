FROM node:20
COPY ./ .
COPY ./.next next
RUN yarn install

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "dev", "-p", "8080"]
