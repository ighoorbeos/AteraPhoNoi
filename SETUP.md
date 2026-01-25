# ATERA PHỐ NỐI - Hướng dẫn cấu hình

## 📋 Yêu cầu hệ thống

### Development
- Java 17+
- Node.js 18+
- Maven 3.6+
- Git

### Production (VPS)
- Ubuntu 22.04 LTS
- RAM: 4GB (recommended)
- Docker & Docker Compose

## 🔧 Cấu hình môi trường

### 1. Database (Neon PostgreSQL)

Dự án sử dụng Neon PostgreSQL cloud database.

**Connection String:**
```
jdbc:postgresql://ep-broad-morning-ahbmvxtq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Email Service

**Option 1: Gmail (Recommended cho testing)**
```env
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

**Cách lấy Gmail App Password:**
1. https://myaccount.google.com/apppasswords
2. Chọn "Mail" → Generate
3. Copy 16 ký tự

**Option 2: Brevo (Recommended cho production)**
```env
MAIL_HOST=smtp-relay.brevo.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-brevo-smtp-key
```

**Đăng ký Brevo:**
1. https://www.brevo.com/
2. Settings → SMTP & API
3. Generate SMTP key

### 3. JWT Secret

Generate strong secret key:
```bash
# Linux/Mac
openssl rand -base64 64

# Windows PowerShell
$bytes = New-Object byte[] 64
(New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

## 🚀 Setup Development

### Backend

```bash
cd backend

# Tạo file .env
cp ../.env.example .env
# Chỉnh sửa .env với thông tin của bạn

# Chạy backend
mvn spring-boot:run
```

Backend sẽ chạy tại: `http://localhost:8080`

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Chạy dev server
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### Admin Account

**Default login:**
- URL: `http://localhost:5173/admin/login`
- Username: `admin`
- Password: `admin123`

## 🐳 Setup với Docker

### 1. Chuẩn bị

```bash
# Tạo file .env
cp .env.example .env

# Chỉnh sửa file .env
nano .env
```

**File .env:**
```env
# Database
DATABASE_URL=jdbc:postgresql://ep-broad-morning-ahbmvxtq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=npg_2wQVzoqj5rfU

# JWT
JWT_SECRET=your-jwt-secret-key

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@atera.com

# CORS
CORS_ORIGINS=http://localhost,http://your-domain.com

# Frontend
VITE_API_URL=/api/v1
```

### 2. Build và chạy

```bash
# Build và start containers
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Stop containers
docker-compose down
```

**Services:**
- Frontend: `http://localhost`
- Backend: `http://localhost:8080`

## 🌐 Deploy lên VPS

### 1. Chuẩn bị VPS

```bash
# SSH vào VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

### 2. Deploy dự án

```bash
# Clone repository
git clone https://github.com/ighoorbeos/AteraPhoNoi.git /opt/atera
cd /opt/atera/atera-landing-page

# Tạo file .env
cp .env.example .env
nano .env
```

**Cập nhật CORS_ORIGINS:**
```env
CORS_ORIGINS=http://your-domain.com,https://your-domain.com
```

```bash
# Build và start
docker-compose up -d --build

# Check status
docker-compose ps
docker-compose logs -f
```

### 3. Cấu hình domain (Optional)

**Thêm A record:**
- Type: A
- Name: @
- Value: your-vps-ip

**Cài Nginx + SSL:**
```bash
apt install nginx certbot python3-certbot-nginx -y

# Tạo Nginx config
nano /etc/nginx/sites-available/atera

# Nội dung:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/atera /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Install SSL
certbot --nginx -d your-domain.com
```

## 🔐 Bảo mật

### 1. Environment Variables

**KHÔNG bao giờ commit `.env` lên Git**

`.gitignore` đã có:
```
.env
.env.local
.env.production
```

### 2. Change default admin password

```bash
# Login admin dashboard
# Settings → Change password
```

### 3. Đổi JWT Secret

Generate mới và update trong `.env`

### 4. Firewall

```bash
# Chỉ mở port cần thiết
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
```

## 📊 Monitoring

### Docker logs

```bash
# Xem logs tất cả services
docker-compose logs -f

# Xem logs backend
docker-compose logs -f backend

# Xem logs frontend
docker-compose logs -f frontend
```

### Database monitoring

Truy cập Neon Dashboard:
https://console.neon.tech/

### Email monitoring

**Gmail:**
- Sent folder

**Brevo:**
- https://app.brevo.com/statistics/email

## 🆘 Troubleshooting

### Backend không start

```bash
# Check logs
docker-compose logs backend

# Common issues:
# - Database connection failed: check DATABASE_URL
# - Port 8080 in use: kill process
```

### Email không gửi được

```bash
# Check logs
docker-compose logs backend | grep -i email

# Verify:
# - MAIL_USERNAME/PASSWORD đúng
# - Gmail: dùng App Password
# - Brevo: verify sender email
```

### Frontend không load API

```bash
# Check CORS settings
# Verify CORS_ORIGINS trong .env bao gồm domain của bạn
```

## 📞 Support

- Repository: https://github.com/ighoorbeos/AteraPhoNoi
- Hotline: 0909 888 999
