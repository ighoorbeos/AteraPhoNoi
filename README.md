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

### 2. SSH vào VPS và chạy script
```bash
# Clone repository
git clone https://github.com/ighoorbeos/AteraPhoNoi.git /opt/atera-landing-page
cd /opt/atera-landing-page

# Chạy script deploy
chmod +x deploy.sh
sudo ./deploy.sh
```

### 3. Cấu hình domain
Thêm A record trỏ domain đến IP VPS.

##  Environment Variables

| Variable | Description |
|----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| DATABASE_USERNAME | Database username |
| DATABASE_PASSWORD | Database password |
| JWT_SECRET | JWT signing key |
| CORS_ORIGINS | Allowed origins |

##  Features

-  Responsive design
-  Real-time chat với Admin
-  Contact form
-  Image gallery
-  Admin dashboard
-  Cloud database (Neon PostgreSQL)
-  Docker ready

##  Admin Access

- URL: http://your-domain/admin/login
- Default: admin / admin123

##  Liên hệ

- Hotline: 0909 888 999
- Email: contact@atera-phonoi.vn
