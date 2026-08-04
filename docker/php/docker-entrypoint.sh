--- docker/php/docker-entrypoint.sh (原始)


+++ docker/php/docker-entrypoint.sh (修改后)
#!/bin/bash
set -e

# Set working directory
cd /var/www/html

# Create necessary directories if they don't exist
mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache

# Set permissions
chown -R laravel:laravel storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Check if .env file exists, if not copy from .env.example
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Check if APP_KEY is set, if not generate it
if [ -z "$(grep '^APP_KEY=' .env | cut -d '=' -f2)" ] || [ "$(grep '^APP_KEY=' .env | cut -d '=' -f2)" = "" ]; then
    echo "Generating application key..."
    php artisan key:generate
fi

# Install composer dependencies if vendor directory doesn't exist or composer.json changed
if [ ! -d "vendor" ] || [ "composer.lock" -ot "composer.json" ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --no-dev --optimize-autoloader
fi

# Run database migrations if database is set up
echo "Checking database connection..."
if php artisan migrate:status > /dev/null 2>&1; then
    echo "Running database migrations..."
    php artisan migrate --force
else
    echo "Database not ready yet. Migrations will be run manually."
fi

# Create storage link
if [ ! -L "public/storage" ]; then
    echo "Creating storage link..."
    php artisan storage:link
fi

# Clear caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

echo "Container setup complete!"

# Execute the main command
exec "$@"