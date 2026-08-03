#!/bin/bash

# Laravel SaaS E-Commerce Platform Setup Script
# This script creates a fresh Laravel project and integrates our custom code

set -e

echo "🚀 Starting Laravel SaaS E-Commerce Platform Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_DIR="/workspace/backend"
TEMP_DIR="/tmp/laravel-temp"

echo -e "${GREEN}Step 1: Creating fresh Laravel project${NC}"

# Check if composer is available
if ! command -v composer &> /dev/null; then
    echo -e "${RED}Error: Composer is not installed. Please install Composer first.${NC}"
    exit 1
fi

# Remove existing backend directory if it exists
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${YELLOW}Removing existing backend directory...${NC}"
    rm -rf "$BACKEND_DIR"
fi

# Create fresh Laravel project
echo -e "${GREEN}Creating fresh Laravel 11 project...${NC}"
composer create-project laravel/laravel "$BACKEND_DIR" "^11.0" --prefer-dist

cd "$BACKEND_DIR"

echo -e "${GREEN}Step 2: Installing required packages${NC}"

# Install required packages
composer require laravel/sanctum spatie/laravel-permission pragmarx/google2fa-laravel bacon/bacon-qr-code \
    --no-interaction --prefer-dist

echo -e "${GREEN}Step 3: Creating directory structure${NC}"

# Create custom directories
mkdir -p app/Repositories
mkdir -p app/Services
mkdir -p app/DTOs
mkdir -p app/Events
mkdir -p app/Listeners
mkdir -p app/Jobs
mkdir -p app/Notifications
mkdir -p app/Policies
mkdir -p app/Rules
mkdir -p app/Http/Controllers/Api/V1
mkdir -p app/Http/Controllers/Api/V1/Auth
mkdir -p app/Http/Controllers/Api/V1/Product
mkdir -p app/Http/Controllers/Api/V1/Order
mkdir -p app/Http/Controllers/Api/V1/Cart
mkdir -p app/Http/Controllers/Api/V1/User
mkdir -p app/Http/Controllers/Api/V1/Affiliate
mkdir -p app/Http/Controllers/Admin
mkdir -p app/Http/Resources/V1
mkdir -p app/Http/Resources/V1/Product
mkdir -p app/Http/Resources/V1/Order
mkdir -p app/Http/Resources/V1/User
mkdir -p app/Http/Requests
mkdir -p app/Http/Requests/Auth
mkdir -p app/Http/Requests/Product
mkdir -p app/Http/Requests/Order
mkdir -p app/Http/Requests/Cart
mkdir -p app/Models/Traits
mkdir -p database/seeders
mkdir -p database/factories
mkdir -p routes/api/v1
mkdir -p storage/app/public/products
mkdir -p storage/app/public/avatars
mkdir -p storage/app/public/invoices
mkdir -p tests/Feature/Api
mkdir -p tests/Unit

echo -e "${GREEN}Step 4: Creating core files${NC}"

# Create .env file from example
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

# Generate application key
php artisan key:generate

echo -e "${GREEN}Step 5: Creating migration files${NC}"

# We'll create migrations in the next step

echo -e "${GREEN}✅ Laravel project setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Configure your .env file (database, mail, etc.)"
echo "2. Run migrations: php artisan migrate"
echo "3. Run seeders: php artisan db:seed"
echo "4. Link storage: php artisan storage:link"
echo "5. Start development server: php artisan serve"
echo ""
echo -e "${GREEN}Your Laravel project is ready at: $BACKEND_DIR${NC}"
