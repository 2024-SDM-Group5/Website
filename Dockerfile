FROM node:20
COPY ./ .
RUN apt-get autoremove
RUN apt-get update
RUN apt-get -o DPkg::Options::="--force-confnew" install -y nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN yarn install
RUN yarn run build

EXPOSE 8080

CMD ["/bin/bash", "-c", "service nginx start && yarn run start -p 3000"]
