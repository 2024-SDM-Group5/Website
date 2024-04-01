FROM node:20
COPY ./ .
RUN yarn install
RUN yarn run build
RUN mv .next _next

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "start", "-p", "8080"]
