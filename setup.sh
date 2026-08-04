--- setup.sh (原始)


+++ setup.sh (修改后)
#!/bin/bash

# =============================================================================
# Laravel SaaS E-Commerce Platform - Setup Script
# =============================================================================
# This script sets up the complete development environment using Docker.
# It assumes you already have a Laravel 11 project in the backend folder.
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Laravel + Vue.js SaaS E-Commerce Platform Setup      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Check if backend directory exists
if [ ! -d "${BACKEND_DIR}" ]; then
    echo -e "${RED}❌ Backend directory not found at ${BACKEND_DIR}${NC}"
    echo "Please ensure you have a Laravel 11 project in the backend folder."
    exit 1
fi

echo -e "${GREEN}✅ Backend directory found${NC}"

# Check if Laravel artisan file exists
if [ ! -f "${BACKEND_DIR}/artisan" ]; then
    echo -e "${RED}❌ Laravel artisan file not found. Is this a valid Laravel project?${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Valid Laravel project detected${NC}"
echo ""

# Check if .env file exists in backend
if [ ! -f "${BACKEND_DIR}/.env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    if [ -f "${BACKEND_DIR}/.env.example" ]; then
        cp "${BACKEND_DIR}/.env.example" "${BACKEND_DIR}/.env"
        echo -e "${GREEN}✅ .env file created${NC}"
    else
        echo -e "${RED}❌ .env.example not found. Please create .env file manually.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Check if APP_KEY is set
if grep -q "^APP_KEY=$" "${BACKEND_DIR}/.env" || ! grep -q "^APP_KEY=" "${BACKEND_DIR}/.env"; then
    echo -e "${YELLOW}⚠️  APP_KEY is not set. Generating application key...${NC}"
    cd "${BACKEND_DIR}"
    if command -v php &> /dev/null; then
        php artisan key:generate
    else
        echo "PHP not available locally. Key will be generated in container."
    fi
    echo -e "${GREEN}✅ APP_KEY generated${NC}"
else
    echo -e "${GREEN}✅ APP_KEY is already set${NC}"
fi

echo ""
echo -e "${BLUE}─────────────────────────────────────────────────────────${NC}"
echo -e "${BLUE}Building Docker containers...${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────${NC}"
echo ""

# Stop any running containers
echo -e "${YELLOW}Stopping existing containers...${NC}"
docker compose down --remove-orphans 2>/dev/null || true

# Build containers
echo -e "${YELLOW}Building PHP container...${NC}"
docker compose build --no-cache php

echo ""
echo -e "${BLUE}─────────────────────────────────────────────────────────${NC}"
echo -e "${BLUE}Starting services...${NC}"
echo -e "${BLUE}─────────────────────────────────────────────────────────${NC}"
echo ""

# Start all services
docker compose up -d

# Wait for MySQL to be ready
echo ""
echo -e "${YELLOW}Waiting for MySQL to be ready...${NC}"
sleep 10

# Run migrations inside container
echo -e "${BLUE}Running database migrations...${NC}"
docker compose exec -T php php artisan migrate --force || {
    echo -e "${YELLOW}⚠️  Database migrations failed. Database might not be ready yet.${NC}"
    echo "You can run migrations manually later with: docker compose exec php php artisan migrate"
}

# Create storage link
echo -e "${BLUE}Creating storage link...${NC}"
docker compose exec -T php php artisan storage:link || true

# Clear caches
echo -e "${BLUE}Clearing caches...${NC}"
docker compose exec -T php php artisan config:clear || true
docker compose exec -T php php artisan cache:clear || true
docker compose exec -T php php artisan route:clear || true

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Setup Complete!                                    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📊 Service URLs:${NC}"
echo -e "   • Application:  ${GREEN}http://localhost${NC}"
echo -e "   • Frontend Dev: ${GREEN}http://localhost:5173${NC}"
echo -e "   • MailHog:      ${GREEN}http://localhost:8025${NC}"
echo -e "   • MySQL:        ${GREEN}localhost:3306${NC}"
echo -e "   • Redis:        ${GREEN}localhost:6379${NC}"
echo ""
echo -e "${BLUE}📝 Useful Commands:${NC}"
echo -e "   • View logs:         ${YELLOW}docker compose logs -f${NC}"
echo -e "   • Access PHP shell:  ${YELLOW}docker compose exec php bash${NC}"
echo -e "   • Run artisan:       ${YELLOW}docker compose exec php php artisan <command>${NC}"
echo -e "   • Queue worker:      ${YELLOW}docker compose logs -f horizon${NC}"
echo -e "   • Stop services:     ${YELLOW}docker compose down${NC}"
echo ""
echo -e "${YELLOW}⚠️  Note: If you encounter permission issues, run:${NC}"
echo -e "   ${YELLOW}sudo chown -R \$USER:\$USER backend storage${NC}"
echo ""