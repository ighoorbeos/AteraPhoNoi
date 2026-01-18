# 🏢 ATERA PHỐ NỐI - Landing Page & Admin System

Hệ thống landing page và quản trị cho dự án bất động sản ATERA PHỐ NỐI.

## 📦 Công nghệ sử dụng

### Backend
- **Spring Boot 3.2.1** - Java Framework
- **Spring Security** - Authentication & Authorization
- **JWT** - Token-based authentication
- **Spring Data JPA** - ORM
- **MySQL 8.0** - Database
- **Maven** - Build tool

### Frontend
- **React 18** - UI Framework
- **React Router v6** - Routing
- **Vite 5** - Build tool
- **Tailwind CSS 3** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations

## 🗂️ Cấu trúc dự án

```
atera-landing-page/
├── backend/                      # Spring Boot Backend
│   ├── src/main/java/com/atera/
│   │   ├── config/              # Cấu hình (Security, CORS, Data Init)
│   │   ├── controller/          # REST API Controllers
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── entity/              # JPA Entities
│   │   ├── repository/          # Spring Data Repositories
│   │   ├── security/            # JWT Security
│   │   └── service/             # Business Logic
│   └── src/main/resources/
│       └── application.yml      # Cấu hình ứng dụng
│
├── frontend/                    # React Frontend
│   ├── src/
│   │   ├── components/          # React Components
│   │   ├── contexts/            # React Context (Auth)
│   │   ├── pages/               # Pages
│   │   │   ├── LandingPage.jsx  # Trang chủ public
│   │   │   └── admin/           # Trang admin
│   │   │       ├── LoginPage.jsx
│   │   │       └── DashboardPage.jsx
│   │   └── services/            # API Services
│   └── public/images/           # Hình ảnh dự án
│
└── setup-database.sql           # SQL script tạo database
```

## 🚀 Hướng dẫn cài đặt

### 1️⃣ Cài đặt Database

#### Cách 1: MySQL Command Line
```bash
mysql -u root -p < setup-database.sql
```

#### Cách 2: MySQL Workbench / phpMyAdmin
- Mở file `setup-database.sql`
- Execute script

**Thông tin database:**
- Database: `atera_db`
- Username: `atera_user`
- Password: `Atera@2024#Secure`

📖 Chi tiết xem file: [DATABASE-SETUP.md](./DATABASE-SETUP.md)

### 2️⃣ Chạy Backend (Spring Boot)

```bash
# Di chuyển vào thư mục backend
cd backend

# Build và chạy
mvn spring-boot:run

# Hoặc build JAR và chạy
mvn clean package -DskipTests
java -jar target/atera-landing-api-1.0.0.jar
```

Backend sẽ chạy tại: **http://localhost:8080**

### 3️⃣ Chạy Frontend (React)

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies (lần đầu)
npm install

# Chạy development server
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

## 🌐 Các trang trong hệ thống

### Trang Public (Không cần đăng nhập)

| Trang | URL | Mô tả |
|-------|-----|-------|
| Landing Page | http://localhost:5173/ | Trang giới thiệu dự án |
| Admin Login | http://localhost:5173/admin/login | Đăng nhập admin |

### Trang Admin (Cần đăng nhập)

| Trang | URL | Yêu cầu | Mô tả |
|-------|-----|---------|-------|
| Dashboard | http://localhost:5173/admin/dashboard | ADMIN / SALES | Quản lý contacts |

## 🔐 Phân quyền hệ thống

### Roles (Vai trò)

1. **ADMIN** - Quản trị viên
   - Toàn quyền truy cập
   - Xem và quản lý tất cả tin nhắn từ guests
   - Thay đổi trạng thái tin nhắn

2. **USER** - Người dùng thường (Guest)
   - Xem thông tin dự án
   - Gửi tin nhắn liên hệ
   - Không truy cập admin panel

### Tài khoản mặc định

#### Admin Account
```
Username: admin
Password: admin123
Role: ADMIN
```

## 📡 API Endpoints

### Public Endpoints (Không cần token)

```
POST   /api/v1/auth/login          # Đăng nhập
POST   /api/v1/auth/register       # Đăng ký (nếu enabled)
GET    /api/v1/public/project      # Lấy thông tin dự án
POST   /api/v1/public/contacts     # Gửi form liên hệ
```

### Protected Endpoints (Cần JWT token)

```
GET    /api/v1/contacts            # Lấy danh sách tin nhắn (ADMIN only)
GET    /api/v1/contacts/{id}       # Lấy chi tiết tin nhắn (ADMIN only)
PUT    /api/v1/contacts/{id}/status # Cập nhật trạng thái (ADMIN only)
DELETE /api/v1/contacts/{id}       # Xóa tin nhắn (ADMIN only)
```

📖 Chi tiết API: [API-DOCUMENTATION.md](./API-DOCUMENTATION.md)

## 🗄️ Database Schema

### Bảng Users (Tài khoản)
```sql
- id (PK)
- username (unique)
- password (encrypted)
- email (unique)
- full_name
- role (ADMIN/SALES/USER)
- phone
- is_active
- created_at
- updated_at
```

### Bảng Contacts (Liên hệ)
```sql
- id (PK)
- full_name
- email
- phone
- message
- interest_type (SHOPHOUSE/VILLA/TOWNHOUSE/GENERAL)
- status (NEW/CONTACTED/INTERESTED/MEETING_SCHEDULED/CONVERTED/NOT_INTERESTED/SPAM)
- assigned_to (FK to users)
- ip_address
- user_agent
- created_at
- updated_at
```

### Bảng Projects (Dự án)
```sql
- id (PK)
- name
- address
- description
- slogan
- start_price
- total_area
- total_units
- status
- developer
- sales_email
- sales_phone
- latitude
- longitude
- facebook_url
- youtube_video_url
- zalo_url
- is_active
- created_at
- updated_at
```

### Các bảng khác
- `product_types` - Loại sản phẩm
- `amenities` - Tiện ích
- `gallery_images` - Hình ảnh

## 🎨 Tính năng Landing Page

✅ Hero section với slideshow
✅ Tổng quan dự án
✅ Vị trí - Google Maps
✅ Thiết kế nội thất
✅ Mặt bằng căn hộ
✅ Tiện ích
✅ Gallery hình ảnh
✅ Form liên hệ
✅ Floating contact button
✅ Responsive design

## 🛡️ Tính năng Admin Panel

✅ Đăng nhập JWT authentication (chỉ ADMIN)
✅ Dashboard xem tin nhắn từ guests
✅ Thống kê tin nhắn (Tổng, Mới, Đã liên hệ, Chuyển đổi)
✅ Quản lý tin nhắn (xem, cập nhật trạng thái)
✅ Filter tin nhắn theo trạng thái
✅ Responsive design

## 🔧 Cấu hình

### Backend Configuration (application.yml)

```yaml
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/atera_db
spring.datasource.username=atera_user
spring.datasource.password=Atera@2024#Secure

# JPA
spring.jpa.hibernate.ddl-auto=update  # Tự động tạo/update tables
spring.jpa.show-sql=true              # Hiển thị SQL queries

# JWT
jwt.secret=<your-base64-secret>
jwt.expiration=86400000               # 24 hours
```

### Frontend Configuration (.env)

```env
VITE_API_URL=http://localhost:8080/api/v1
```

## 📝 Scripts

### Backend
```bash
mvn spring-boot:run          # Chạy development
mvn clean package            # Build JAR
mvn test                     # Chạy tests
```

### Frontend
```bash
npm run dev                  # Development server
npm run build                # Build production
npm run preview              # Preview production build
```

## 🐳 Docker Deployment (Optional)

```bash
# Build và chạy toàn bộ stack
docker-compose up -d

# Stop
docker-compose down
```

## 🔍 Troubleshooting

### Backend không kết nối được database
```bash
# Kiểm tra MySQL đang chạy
net start MySQL80

# Kiểm tra user và database
mysql -u atera_user -p atera_db
```

### Frontend không gọi được API
- Kiểm tra backend đang chạy: http://localhost:8080
- Kiểm tra CORS config trong SecurityConfig.java
- Kiểm tra VITE_API_URL trong .env

### JWT token expired
- Token có thời hạn 24h
- Đăng xuất và đăng nhập lại

## 📞 Liên hệ

Dự án được phát triển cho ATERA PHỐ NỐI

---

## 📄 License

Private project - All rights reserved

---

**🎉 Chúc bạn thành công với dự án!**
