# ATERA PHỐ NỐI - Landing Page

Dự án Landing Page quảng bá bất động sản ATERA PHỐ NỐI.

##  Tech Stack

- **Backend**: Spring Boot 3.2, Java 17, Maven
- **Frontend**: React 18, Vite, Tailwind CSS
- **Database**: Neon PostgreSQL (Cloud)
- **Deployment**: Docker, Nginx

##  Quick Start (Development)

### Frontend
```bash
cd frontend
npm install
npm run dev
# Mở http://localhost:5173
```

### Backend
```bash
cd backend
mvn spring-boot:run
# API: http://localhost:8080
```

##  Deploy lên VPS (Production)

### 1. Mua VPS
Khuyến nghị: **Ubuntu 22.04**, tối thiểu 4GB RAM

### 2. SSH vào VPS và chạy script deploy
```bash
# Clone repository
git clone https://github.com/ighoorbeos/AteraPhoNoi.git
cd AteraPhoNoi/atera-landing-page

# Make scripts executable
chmod +x *.sh

# Run main deployment
sudo ./deploy.sh
```

Script sẽ tự động:
- ✅ Update hệ thống
- ✅ Cài Docker & Docker Compose
- ✅ Cài Nginx
- ✅ Cấu hình Firewall (UFW)
- ✅ Cài Certbot (cho SSL)
- ✅ Clone/update code
- ✅ Build và start containers

### 3. Cấu hình Domain (Optional)
```bash
# Thêm A record: your-domain.com → VPS IP

# Chạy script setup domain
sudo ./setup-domain.sh your-domain.com

# Cài SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 4. Setup Monitoring (Optional)
```bash
sudo ./setup-monitoring.sh
```

Monitoring tools:
- 🐳 **Portainer**: Docker GUI tại `https://your-ip:9443`
- ⚡ **Quick commands**: `atera-logs`, `atera-status`, `atera-restart`, `atera-update`

##  Environment Variables

Tạo file `.env` từ `.env.example`:

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | jdbc:postgresql://host/db?sslmode=require |
| DATABASE_USERNAME | Database username | neondb_owner |
| DATABASE_PASSWORD | Database password | npg_xxx |
| JWT_SECRET | JWT signing key | openssl rand -base64 64 |
| MAIL_HOST | SMTP host | smtp.gmail.com hoặc smtp-relay.brevo.com |
| MAIL_PORT | SMTP port | 587 |
| MAIL_USERNAME | Email account | your-email@gmail.com |
| MAIL_PASSWORD | App Password/SMTP Key | xxxx xxxx xxxx xxxx |
| ADMIN_EMAIL | Admin email nhận thông báo | admin@atera.com |
| CORS_ORIGINS | Allowed origins | http://your-domain.com,https://your-domain.com |

##  Features

-  Responsive design
-  Real-time chat với Admin
-  Contact form với email notification
-  Image gallery
-  Admin dashboard
-  Cloud database (Neon PostgreSQL)
-  Email notifications (admin + customer)
-  Docker deployment
-  One-click setup scripts

##  Scripts

| Script | Mục đích |
|--------|----------|
| `deploy.sh` | Deploy chính (Docker + Nginx + Firewall) |
| `setup-domain.sh` | Cấu hình domain và Nginx reverse proxy |
| `setup-monitoring.sh` | Cài Portainer và monitoring tools |

##  Admin Access

- URL: http://your-domain/admin/login
- Default: admin / admin123

##  Liên hệ

- Hotline: 0909 888 999
- Email: contact@atera-phonoi.vn
