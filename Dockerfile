FROM node:20

# Set work directory to avoid polluting the container's root directory
WORKDIR /app

# Copy all local files into the container
COPY . .

# Install nginx and clean up in one layer to reduce image size
RUN apt-get update && \
    apt-get -o DPkg::Options::="--force-confnew" install -y nginx && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install dependencies and build the project
RUN yarn install && \
    yarn run build

# Expose the correct port
EXPOSE 8080

# Set the entrypoint to start nginx and the node application
ENTRYPOINT ["/bin/bash", "-c", "nginx -g 'daemon off;' & yarn run start -p 3000"]
