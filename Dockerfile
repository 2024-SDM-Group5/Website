# 階段 1: 建構階段
FROM node:20 as builder
COPY ./ .
RUN yarn install && yarn run build

# 階段 2: 運行階段
FROM node:20-slim
COPY --from=builder /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN apt-get update && \
    apt-get -o DPkg::Options::="--force-confnew" install -y nginx && \
    apt-get autoremove && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
