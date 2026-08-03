# SaaS E-Commerce Platform - Development Guide

## Prerequisites

- Docker & Docker Compose
- Git
- Node.js 20+ (for local development)
- PHP 8.3+ (optional, for local development without Docker)
- Composer (optional, for local development without Docker)

## Quick Start

### 1. Clone the Repository

```bash
cd /workspace
git clone https://github.com/El-Fehri/Ecommerce-Platform.git
```

### 2. Environment Setup

```bash
# Copy environment file
cp backend/.env.example backend/.env

# Generate application key (after Laravel installation)
docker-compose exec php php artisan key:generate
```

### 3. Start Docker Containers

```bash
# Build and start all services
docker-compose up -d --build

# Check container status
docker-compose ps
```

### 4. Install Backend Dependencies

```bash
# Enter PHP container
docker-compose exec php bash

# Install Composer dependencies
composer install

# Run migrations
php artisan migrate

# Seed database (optional)
php artisan db:seed

# Link storage
php artisan storage:link

# Start Horizon (queue worker)
php artisan horizon
```

### 5. Install Frontend Dependencies

```bash
# Enter Node container
docker-compose exec node bash

# Install npm dependencies
npm install

# Start development server
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost/api
- **Mailhog**: http://localhost:8025
- **MySQL**: localhost:3306
- **Redis**: localhost:6379

## Development Workflow

### Running Commands

```bash
# Run artisan commands
docker-compose exec php php artisan <command>

# Run composer commands
docker-compose exec php composer <command>

# Run npm commands
docker-compose exec node npm run <command>

# Run tests
docker-compose exec php php artisan test

# Clear caches
docker-compose exec php php artisan cache:clear
docker-compose exec php php artisan config:clear
docker-compose exec php php artisan route:clear
docker-compose exec php php artisan view:clear
```

### Database Management

```bash
# Run migrations
docker-compose exec php php artisan migrate

# Rollback migrations
docker-compose exec php php artisan migrate:rollback

# Reset database
docker-compose exec php php artisan migrate:fresh

# Seed database
docker-compose exec php php artisan db:seed

# Create database dump
docker-compose exec mysql mysqldump -u saas_user -p saas_ecommerce > backup.sql
```

### Queue Management

```bash
# Start Horizon
docker-compose exec php php artisan horizon

# Monitor queues
docker-compose exec php php artisan horizon:status

# Pause Horizon
docker-compose exec php php artisan horizon:pause

# Continue Horizon
docker-compose exec php php artisan horizon:continue
```

### Scheduler

The scheduler runs automatically in a separate container. To test:

```bash
# Run scheduled tasks manually
docker-compose exec php php artisan schedule:run
```

## Testing

### Backend Tests

```bash
# Run all tests
docker-compose exec php php artisan test

# Run specific test file
docker-compose exec php php artisan test tests/Feature/AuthTest.php

# Run with coverage
docker-compose exec php php artisan test --coverage

# Run Pest tests
docker-compose exec php ./vendor/bin/pest
```

### Frontend Tests

```bash
# Run unit tests
docker-compose exec node npm run test

# Run E2E tests
docker-compose exec node npm run test:e2e

# Run with coverage
docker-compose exec node npm run test:coverage
```

## Code Quality

### PHP CS Fixer

```bash
docker-compose exec php ./vendor/bin/php-cs-fixer fix
```

### PHPStan

```bash
docker-compose exec php ./vendor/bin/phpstan analyse
```

### ESLint

```bash
docker-compose exec node npm run lint
```

### Prettier

```bash
docker-compose exec node npm run format
```

## Production Deployment

### Build for Production

```bash
# Build frontend
docker-compose exec node npm run build

# Optimize Laravel
docker-compose exec php php artisan optimize
docker-compose exec php php artisan config:cache
docker-compose exec php php artisan route:cache
docker-compose exec php php artisan view:cache
```

### Environment Variables for Production

Update `backend/.env` with production values:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_HOST=production-db-host
DB_DATABASE=production_db
DB_USERNAME=production_user
DB_PASSWORD=strong_password

REDIS_HOST=production-redis-host

MAIL_MAILER=smtp
MAIL_HOST=smtp.provider.com
MAIL_PORT=587
MAIL_USERNAME=user
MAIL_PASSWORD=password
MAIL_ENCRYPTION=tls

FRONTEND_URL=https://yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com
SESSION_DOMAIN=.yourdomain.com
```

### SSL Configuration

1. Obtain SSL certificates (Let's Encrypt recommended)
2. Place certificates in `docker/nginx/ssl/`
3. Update Nginx configuration for HTTPS
4. Update docker-compose.yml to expose port 443

### CI/CD Pipeline

GitHub Actions workflow is configured in `.github/workflows/`. The pipeline:

1. Runs tests on every push
2. Builds Docker images
3. Deploys to staging on merge to `develop`
4. Deploys to production on merge to `main`

## Monitoring & Logging

### Application Logs

```bash
# View logs
docker-compose logs -f php
docker-compose logs -f nginx
docker-compose logs -f mysql

# Laravel logs
docker-compose exec php tail -f storage/logs/laravel.log
```

### Horizon Dashboard

Access Horizon dashboard at: `/admin/horizon` (requires authentication)

### Telescope (Development)

Enable Telescope in `.env`:
```env
TELESCOPE_ENABLED=true
```

Access at: `/telescope`

## Troubleshooting

### Common Issues

**Container won't start:**
```bash
docker-compose down
docker-compose up -d --build
```

**Database connection error:**
```bash
docker-compose restart mysql
docker-compose exec php php artisan migrate
```

**Permission issues:**
```bash
docker-compose exec php chown -R www-data:www-data storage bootstrap/cache
docker-compose exec php chmod -R 775 storage bootstrap/cache
```

**Node modules issues:**
```bash
docker-compose exec node rm -rf node_modules package-lock.json
docker-compose exec node npm install
```

### Reset Everything

```bash
docker-compose down -v
docker-compose up -d --build
docker-compose exec php composer install
docker-compose exec php php artisan migrate:fresh --seed
docker-compose exec node npm install
```

## Architecture Notes

### Multi-Tenancy

The platform supports multi-tenancy with:
- Database-level isolation (separate databases per tenant)
- Schema-level isolation (shared database, separate schemas)
- Row-level isolation (shared database with tenant_id)

Configuration in `config/tenancy.php`

### API Versioning

APIs are versioned under `/api/v1/`. Future versions will be `/api/v2/`, etc.

### Authentication Flow

1. User registers/logs in via frontend
2. Backend creates Sanctum token
3. Token is stored in frontend store
4. All API requests include token in Authorization header
5. Token is validated on each request

### File Storage

Files are stored in:
- Local: `storage/app/`
- Public: `storage/app/public/` (linked to `public/storage`)
- S3: Configured via environment variables

## Security Best Practices

1. Never commit `.env` files
2. Use strong passwords for database and admin accounts
3. Enable 2FA for admin users
4. Regular security updates
5. Monitor logs for suspicious activity
6. Implement rate limiting
7. Use HTTPS in production
8. Regular database backups

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## License

Proprietary - All rights reserved
