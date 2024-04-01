FROM node:20
COPY ./ .
COPY nginx.conf /etc/nginx/
RUN apt update && apt install nginx
RUN yarn install
RUN yarn run build
RUN cp -r .next _next

EXPOSE 8080

CMD ["service", "start", "nginx"]
ENTRYPOINT  ["yarn", "run", "start", "-p", "8080"]
