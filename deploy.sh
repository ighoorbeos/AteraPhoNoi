#!/bin/bash

# =============================================
# ATERA PHỐ NỐI - VPS Deployment Script
# =============================================
# Run this script on your VPS (Ubuntu 22.04)

echo "🚀 Starting ATERA deployment..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root (sudo)${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 1: Updating system...${NC}"
apt update && apt upgrade -y

echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
    echo -e "${GREEN}Docker installed successfully!${NC}"
else
    echo -e "${GREEN}Docker already installed.${NC}"
fi

echo -e "${YELLOW}Step 3: Installing Docker Compose...${NC}"
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}Docker Compose installed successfully!${NC}"
else
    echo -e "${GREEN}Docker Compose already installed.${NC}"
fi

echo -e "${YELLOW}Step 4: Installing Git...${NC}"
apt install -y git

echo -e "${YELLOW}Step 5: Cloning repository...${NC}"
cd /opt
if [ -d "atera-landing-page" ]; then
    echo "Directory exists, pulling latest..."
    cd atera-landing-page
    git pull origin main
else
    git clone https://github.com/ighoorbeos/AteraPhoNoi.git atera-landing-page
    cd atera-landing-page
fi

echo -e "${YELLOW}Step 6: Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}Please edit .env file with your settings:${NC}"
    echo -e "${YELLOW}nano /opt/atera-landing-page/.env${NC}"
fi

echo -e "${YELLOW}Step 7: Building and starting containers...${NC}"
docker-compose down 2>/dev/null
docker-compose build --no-cache
docker-compose up -d

echo -e "${YELLOW}Step 8: Checking status...${NC}"
sleep 10
docker-compose ps

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}Website: http://$(curl -s ifconfig.me)${NC}"
echo -e "${GREEN}Admin: http://$(curl -s ifconfig.me)/admin/login${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  View logs:      docker-compose logs -f"
echo "  Restart:        docker-compose restart"
echo "  Stop:           docker-compose down"
echo "  Update:         git pull && docker-compose up -d --build"
