FROM node:20
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
COPY ./ /home/node/app
COPY --from=builder --chown=10101 ./home/node/app/next ./_next
COPY --from=builder --chown=10101 ./home/node/app/public ./public
WORKDIR /home/node/app
RUN yarn install
RUN yarn run build

EXPOSE 8080

ENTRYPOINT  ["yarn", "run", "start", "-p", "8080"]
