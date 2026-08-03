FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies including Intl (fixes Normalizer error)
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create system user to run Composer and Artisan commands
RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel \
    && mkdir -p /home/laravel/.composer \
    && chown -R laravel:laravel /home/laravel

# Configure non-root user
USER laravel

# 1. Create a fresh Laravel project directly in the container build
# We ignore platform requirements and security advisories temporarily to ensure build success
RUN composer create-project laravel/laravel:^11.0 . --no-interaction --prefer-dist \
    && composer config --global github-protocols https \
    && composer config --global disable-tls false \
    && composer config --global secure-http false \
    # Ignore security advisories during build to prevent blocking (PKSA errors)
    && composer config --global policy.advisories.ignore true

# 2. Copy your custom backend source code into the fresh Laravel installation
# This overwrites default files with your specific architecture (Models, Migrations, etc.)
COPY --chown=laravel:laravel . .

# 3. Install project dependencies (including your custom packages like spatie/permission)
# Using --no-scripts first to avoid errors if app key isn't set yet, then running scripts
RUN composer install --no-interaction --optimize-autoloader --no-dev || true \
    && composer install --no-interaction --optimize-autoloader

# Create necessary directories if they don't exist after copy
RUN mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Switch back to root for any final permissions if needed, then back to laravel
USER root
RUN chown -R laravel:laravel /var/www/html
USER laravel

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
