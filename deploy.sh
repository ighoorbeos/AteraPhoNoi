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

echo -e "${YELLOW}Step 5: Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo -e "${GREEN}Nginx installed successfully!${NC}"
else
    echo -e "${GREEN}Nginx already installed.${NC}"
fi

echo -e "${YELLOW}Step 6: Configuring Firewall...${NC}"
apt install -y ufw
ufw --force enable
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS
ufw allow 8080/tcp # Backend (optional, for direct access)
echo -e "${GREEN}Firewall configured!${NC}"

echo -e "${YELLOW}Step 7: Installing SSL tools (Certbot)...${NC}"
apt install -y certbot python3-certbot-nginx
echo -e "${GREEN}Certbot installed!${NC}"

echo -e "${YELLOW}Step 8: Cloning repository...${NC}"
cd /opt
if [ -d "AteraPhoNoi" ]; then
    echo "Directory exists, pulling latest..."
    cd AteraPhoNoi/atera-landing-page
    git pull origin main
else
    git clone https://github.com/ighoorbeos/AteraPhoNoi.git
    cd AteraPhoNoi/atera-landing-page
fi

echo -e "${YELLOW}Step 9: Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your settings:${NC}"
    echo -e "${YELLOW}nano .env${NC}"
    echo ""
    read -p "Press Enter after editing .env file..."
fi

echo -e "${YELLOW}Step 10: Building and starting containers...${NC}"
docker-compose down 2>/dev/null
docker-compose build --no-cache
docker-compose up -d

echo -e "${YELLOW}Step 11: Checking status...${NC}"
sleep 10
docker-compose ps

echo ""
echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${GREEN}📍 Your server IP: $(curl -s ifconfig.me)${NC}"
echo -e "${GREEN}🌐 Website: http://$(curl -s ifconfig.me)${NC}"
echo -e "${GREEN}👤 Admin: http://$(curl -s ifconfig.me)/admin/login${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "1️⃣  ${YELLOW}Setup Domain (Optional but recommended):${NC}"
echo "   • Point your domain to: $(curl -s ifconfig.me)"
echo "   • Run: sudo ./setup-domain.sh your-domain.com"
echo ""
echo -e "2️⃣  ${YELLOW}Install SSL Certificate:${NC}"
echo "   • After domain setup, run:"
echo "   • certbot --nginx -d your-domain.com"
echo ""
echo -e "3️⃣  ${YELLOW}Change Admin Password:${NC}"
echo "   • Login at: /admin/login"
echo "   • Default: admin / admin123"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}🛠️  Useful commands:${NC}"
echo "  docker-compose logs -f              # View logs"
echo "  docker-compose restart              # Restart services"
echo "  docker-compose down                 # Stop services"
echo "  git pull && docker-compose up -d --build  # Update app"
echo ""
echo -e "${YELLOW}🔍 Monitoring:${NC}"
echo "  systemctl status nginx              # Check Nginx"
echo "  systemctl status docker             # Check Docker"
echo "  ufw status                          # Check Firewall"
echo ""
