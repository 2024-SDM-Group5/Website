FROM node:20

# Set work directory to avoid polluting the container's root directory
WORKDIR /app

# Copy all local files into the container
COPY . .

# Declare arguments
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_MAP_API_KEY

# Set environment variables
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXT_PUBLIC_MAP_API_KEY=$NEXT_PUBLIC_MAP_API_KEY

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
