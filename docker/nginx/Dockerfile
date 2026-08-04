FROM nginx:alpine

# Copy custom nginx configuration
COPY docker/nginx/conf.d /etc/nginx/conf.d

# Create necessary directories
RUN mkdir -p /var/www/html/public

WORKDIR /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
