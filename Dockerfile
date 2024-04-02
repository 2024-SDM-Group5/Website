FROM node:20
COPY ./ .
RUN apt-get autoremove
RUN apt-get update
RUN apt-get -o DPkg::Options::="--force-confnew" install -y nginx
RUN yarn install
RUN yarn run build

EXPOSE 8080

ENTRYPOINT  ["/bin/bash", "-c", "service nginx start && yarn run start -p 8080"]
