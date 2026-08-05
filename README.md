# Laravel SaaS E-Commerce Platform - Docker Setup Guide

A complete Docker-based development environment for a Laravel 11 + Vue.js 3 SaaS e-commerce platform with multi-tenancy support.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (version 20.10 or higher)
- **Docker Compose** (version 2.0 or higher, or use `docker compose` command)
- **Git**

### Verify Installation

```bash
docker --version
docker compose version
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Run the automated setup script to configure everything in one command:

```bash
cd /workspace
chmod +x setup.sh
./setup.sh
```

This script will:
- Validate your Docker installation
- Check for a valid Laravel 11 project in the `backend/` directory
- Create `.env` file from `.env.example` if missing
- Generate an `APP_KEY` if not set
- Build and start all Docker containers
- Run database migrations
- Set up storage links

### Option 2: Manual Setup

If you prefer to set up manually, follow these steps:

#### Step 1: Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

#### Step 2: Generate Application Key

```bash
docker compose run --rm php php artisan key:generate
```

#### Step 3: Build and Start Containers

```bash
docker compose build --no-cache
docker compose up -d
```

#### Step 4: Run Migrations

```bash
docker compose exec php php artisan migrate
```

#### Step 5: Create Storage Link

```bash
docker compose exec php php artisan storage:link
```

## 🏗️ Architecture Overview

### Services

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| **PHP-FPM** | saas_ecommerce_php | 9000 | Laravel backend with PHP 8.3 |
| **Nginx** | saas_ecommerce_nginx | 8080 | Web server |
| **MySQL** | saas_ecommerce_mysql | 3306 | Database server |
| **Redis** | saas_ecommerce_redis | 6379 | Cache & queue driver |
| **Node.js** | saas_ecommerce_node | 5173 | Vite dev server for frontend |
| **MailHog** | saas_ecommerce_mailhog | 8025 | Email testing tool |
| **Horizon** | saas_ecommerce_horizon | - | Laravel queue manager |
| **Scheduler** | saas_ecommerce_scheduler | - | Laravel task scheduler |

### Directory Structure

```
/workspace
├── backend/              # Laravel 11 application
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   └── .env
├── frontend/             # Vue.js 3 application
│   ├── src/
│   ├── public/
│   └── package.json
├── docker/
│   ├── php/
│   │   ├── Dockerfile
│   │   ├── php.ini
│   │   └── docker-entrypoint.sh
│   └── nginx/
│       ├── Dockerfile
│       └── conf.d/
├── docker-compose.yml
├── setup.sh
└── README.md
```

## 🔌 Access Points

After successful setup, access your services at:

- **Main Application**: http://localhost:8080
- **Frontend Dev Server**: http://localhost:5173
- **MailHog (Email Testing)**: http://localhost:8025
- **MySQL**: localhost:3306
  - Database: `ecommerce`
  - Username: `ecommerce`
  - Password: `secret`
  - Root Password: `secret`
- **Redis**: localhost:6379

## 🛠️ Common Operations

### Starting Services

```bash
# Start all services
docker compose up -d

# Start specific service
docker compose up -d php nginx mysql
```

### Stopping Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (fresh start)
docker compose down -v
```

### Viewing Logs

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f php
docker compose logs -f nginx
```

### Running Artisan Commands

```bash
# Access PHP container
docker compose exec php bash

# Run migrations
docker compose exec php php artisan migrate

# Seed database
docker compose exec php php artisan db:seed

# Clear caches
docker compose exec php php artisan optimize:clear

# Run Horizon
docker compose exec php php artisan horizon

# Queue commands
docker compose exec php php artisan queue:work
docker compose exec php php artisan queue:restart
```

### Composer & NPM Operations

```bash
# Install Composer dependencies
docker compose exec php composer install

# Install NPM packages (frontend)
docker compose exec node npm install

# Build frontend assets
docker compose exec node npm run build
```

### Database Operations

```bash
# Fresh migration with seeding
docker compose exec php php artisan migrate:fresh --seed

# Create a new migration
docker compose exec php php artisan make:migration create_users_table

# Tinker (Laravel REPL)
docker compose exec php php artisan tinker
```

## 🔧 Troubleshooting

### Error: "php.ini not found"

If you encounter this build error:

```
ERROR: failed to compute cache key: "/php.ini": not found
```

**Solution**: Update the Dockerfile to reference the correct path:

```dockerfile
# In docker/php/Dockerfile
COPY docker/php/php.ini /usr/local/etc/php/php.ini
```

Then rebuild:

```bash
docker compose build --no-cache php
docker compose up -d
```

### Container Won't Start

1. Check logs:
```bash
docker compose logs php
```

2. Remove volumes and restart:
```bash
docker compose down -v
docker compose up -d --build
```

3. Re-run migrations:
```bash
docker compose exec php php artisan migrate:fresh --seed
```

### Permission Issues

If you encounter permission errors:

```bash
# Fix permissions inside container
docker compose exec php chown -R www-data:www-data /var/www/html/storage
docker compose exec php chmod -R 775 /var/www/html/storage
```

### Port Already in Use

If port 8080 or 3306 is already in use, modify `docker-compose.yml`:

```yaml
ports:
  - "8081:80"  # Change 8080 to 8081
```

## 🔄 Development Workflow

### Making Code Changes

1. Edit files in `backend/` or `frontend/` directories
2. Changes are automatically reflected (no rebuild needed)
3. For frontend changes, Vite hot-reload works at http://localhost:5173

### Adding New Dependencies

```bash
# PHP packages
docker compose exec php composer require package/name

# NPM packages
docker compose exec node npm install package-name
```

### Reset Everything

For a completely fresh start:

```bash
docker compose down -v
rm backend/.env
./setup.sh
```

## 📝 Configuration

### Environment Variables

Key variables in `backend/.env`:

```env
APP_NAME="SaaS E-Commerce"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=ecommerce
DB_PASSWORD=secret

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_ENCRYPTION=null
```
---
### Local Start
1.  Install Dependencies Locally
```
cd backend
composer install
```
```
# For Ubuntu/Debian
sudo apt-get install php8.3-cli php8.3-fpm php8.3-mysql php8.3-xml php8.3-curl php8.3-gd php8.3-imap php8.3-zip php8.3-intl php8.3-bcmath php8.3-mbstring
```
2. Set Up Environment
```
# Create .env file from example
cp .env.example .env

# Generate application key
php artisan key:generate
```
3. Configure Database
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ecommerce_platform
DB_USERNAME=root
DB_PASSWORD=your_password
```
4. Run Migrations and Setup
```
php artisan migrate --seed
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
5. Start the Application
```
# Start Laravel development server
php artisan serve

# In another terminal, start Vite for frontend assets
npm install && npm run dev
```
--- 
## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Vue.js Documentation](https://vuejs.org/guide/)
- [Docker Documentation](https://docs.docker.com/)
- [Laravel Horizon](https://laravel.com/docs/horizon)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🆘 Support

For issues or questions:

1. Check the logs: `docker compose logs -f`
2. Review the [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
3. Ensure all prerequisites are met
4. Try a complete reset: `docker compose down -v && ./setup.sh`

---

**Happy Coding! 🚀**
