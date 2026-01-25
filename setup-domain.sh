#!/bin/bash

# =============================================
# ATERA PHỐ NỐI - Domain & SSL Setup Script
# =============================================
# Usage: sudo ./setup-domain.sh your-domain.com

DOMAIN=$1

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root (sudo)${NC}"
    exit 1
fi

# Check domain parameter
if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Usage: sudo ./setup-domain.sh your-domain.com${NC}"
    exit 1
fi

echo -e "${GREEN}🌐 Setting up domain: $DOMAIN${NC}"
echo ""

# Step 1: Create Nginx config
echo -e "${YELLOW}Step 1: Creating Nginx configuration...${NC}"
cat > /etc/nginx/sites-available/$DOMAIN <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    location / {
        proxy_pass http://localhost;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # CORS
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
    }

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf)$ {
        proxy_pass http://localhost;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Step 2: Enable site
echo -e "${YELLOW}Step 2: Enabling site...${NC}"
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Remove default site if exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    rm /etc/nginx/sites-enabled/default
fi

# Step 3: Test Nginx config
echo -e "${YELLOW}Step 3: Testing Nginx configuration...${NC}"
nginx -t

if [ $? -ne 0 ]; then
    echo -e "${RED}Nginx configuration test failed!${NC}"
    exit 1
fi

# Step 4: Reload Nginx
echo -e "${YELLOW}Step 4: Reloading Nginx...${NC}"
systemctl reload nginx

echo ""
echo -e "${GREEN}✅ Domain configured successfully!${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "1️⃣  ${YELLOW}Verify DNS is working:${NC}"
echo "   • ping $DOMAIN"
echo "   • Should point to: $(curl -s ifconfig.me)"
echo ""
echo -e "2️⃣  ${YELLOW}Install SSL Certificate:${NC}"
echo "   • sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo ""
echo -e "3️⃣  ${YELLOW}Update backend .env:${NC}"
echo "   • CORS_ORIGINS=http://$DOMAIN,https://$DOMAIN"
echo "   • Then: docker-compose restart backend"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🌐 Your website: http://$DOMAIN${NC}"
echo -e "${GREEN}👤 Admin panel: http://$DOMAIN/admin/login${NC}"
echo ""
