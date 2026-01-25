#!/bin/bash

# =============================================
# ATERA PHỐ NỐI - Monitoring Setup Script
# =============================================
# Installs Portainer for Docker GUI management

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

echo -e "${GREEN}📊 Installing Monitoring Tools...${NC}"
echo ""

# Step 1: Install Portainer (Docker GUI)
echo -e "${YELLOW}Step 1: Installing Portainer...${NC}"
docker volume create portainer_data
docker run -d \
    -p 9000:9000 \
    -p 9443:9443 \
    --name portainer \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:latest

echo -e "${GREEN}Portainer installed!${NC}"
sleep 5

# Step 2: Setup log rotation
echo -e "${YELLOW}Step 2: Setting up Docker log rotation...${NC}"
cat > /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

systemctl restart docker
sleep 10

# Restart app containers
cd /opt/AteraPhoNoi/atera-landing-page
docker-compose restart

echo -e "${GREEN}Log rotation configured!${NC}"

# Step 3: Setup system monitoring alias
echo -e "${YELLOW}Step 3: Creating monitoring shortcuts...${NC}"
cat >> ~/.bashrc <<'EOF'

# ATERA Monitoring Shortcuts
alias atera-logs='cd /opt/AteraPhoNoi/atera-landing-page && docker-compose logs -f'
alias atera-status='cd /opt/AteraPhoNoi/atera-landing-page && docker-compose ps'
alias atera-restart='cd /opt/AteraPhoNoi/atera-landing-page && docker-compose restart'
alias atera-update='cd /opt/AteraPhoNoi/atera-landing-page && git pull && docker-compose up -d --build'
EOF

source ~/.bashrc

echo ""
echo -e "${GREEN}✅ Monitoring tools installed!${NC}"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📊 Monitoring Access:${NC}"
echo ""
echo -e "🐳 ${GREEN}Portainer (Docker GUI):${NC}"
echo "   URL: https://$(curl -s ifconfig.me):9443"
echo "   Setup admin account on first visit"
echo ""
echo -e "${YELLOW}⚡ Quick Commands:${NC}"
echo "   atera-logs       # View real-time logs"
echo "   atera-status     # Check container status"
echo "   atera-restart    # Restart all services"
echo "   atera-update     # Update from Git and rebuild"
echo ""
echo -e "${YELLOW}🔍 Manual Monitoring:${NC}"
echo "   docker stats                    # CPU/Memory usage"
echo "   docker-compose logs -f backend  # Backend logs only"
echo "   docker-compose logs -f frontend # Frontend logs only"
echo "   systemctl status nginx          # Nginx status"
echo "   systemctl status docker         # Docker status"
echo ""
echo -e "${YELLOW}💾 Disk Usage:${NC}"
echo "   df -h                          # Overall disk space"
echo "   docker system df               # Docker disk usage"
echo "   docker system prune -a         # Clean unused images/containers"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
