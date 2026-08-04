FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies including intl for Normalizer class
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    libicu-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure Composer to ignore security advisories during build
RUN composer config --global policy.advisories.block false \
    && composer config --global github-protocols https

# Create system user to run Composer and Artisan commands
RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel \
    && mkdir -p /home/laravel/.composer \
    && chown -R laravel:laravel /home/laravel

# Create Laravel directories if they don't exist and set permissions
RUN mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R laravel:laravel storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Configure PHP
COPY php.ini /usr/local/etc/php/php.ini

# Expose port 9000
EXPOSE 9000

CMD ["php-fpm"]

+++ docker/php/Dockerfile (修改后)
     1	FROM php:8.3-fpm
     2	
     3	# Set working directory
     4	WORKDIR /var/www/html
     5	
     6	# Install system dependencies including intl for Normalizer class
     7	RUN apt-get update && apt-get install -y \
     8	    git \
     9	    curl \
    10	    libpng-dev \
    11	    libonig-dev \
    12	    libxml2-dev \
    13	    libzip-dev \
    14	    zip \
    15	    unzip \
    16	    nodejs \
    17	    npm \
    18	    libicu-dev \
    19	    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl \
    20	    && pecl install redis \
    21	    && docker-php-ext-enable redis \
    22	    && apt-get clean \
    23	    && rm -rf /var/lib/apt/lists/*
    24	
    25	# Install Composer
    26	COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
    27	
    28	# Configure Composer to ignore security advisories during build
    29	RUN composer config --global policy.advisories.block false \
    30	    && composer config --global github-protocols https
    31	
    32	# Create system user to run Composer and Artisan commands
    33	RUN useradd -G www-data,root -u 1000 -d /home/laravel laravel \
    34	    && mkdir -p /home/laravel/.composer \
    35	    && chown -R laravel:laravel /home/laravel
    36	
    37	# Create Laravel directories if they don't exist and set permissions
    38	# This assumes the Laravel project already exists in the mounted volume
    39	RUN mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    40	    || true
    41	
    42	# Copy entrypoint script
    43	COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
    44	RUN chmod +x /usr/local/bin/docker-entrypoint.sh
    45	
    46	# Configure PHP
    47	COPY php.ini /usr/local/etc/php/php.ini
    48	
    49	# Expose port 9000
    50	EXPOSE 9000
    51	
    52	ENTRYPOINT ["docker-entrypoint.sh"]
    53	CMD ["php-fpm"]
    54	
