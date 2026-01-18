# 🏢 ATERA PHỐ NỐI - Landing Page & Admin Panel

Landing page bất động sản với admin panel để quản lý tin nhắn từ khách hàng.

## ⚡ Quick Start

### 1. Tạo Database
```bash
mysql -u root -p < setup-database.sql
```

### 2. Chạy Backend
```bash
cd backend
mvn spring-boot:run
```

### 3. Chạy Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Truy cập
- Landing Page: http://localhost:5173
- Admin Login: http://localhost:5173/admin/login
- Username: `admin` / Password: `admin123`

## 📚 Tài liệu chi tiết

- [QUICK-START.md](./QUICK-START.md) - Hướng dẫn nhanh
- [DATABASE-SETUP.md](./DATABASE-SETUP.md) - Setup database chi tiết
- [PROJECT-README.md](./PROJECT-README.md) - Tài liệu đầy đủ
- [API-DOCUMENTATION.md](./API-DOCUMENTATION.md) - API reference

## 🎯 Tính năng

### Landing Page (Public)
- Giới thiệu dự án BĐS
- Gallery hình ảnh, mặt bằng
- Form liên hệ cho guests

### Admin Panel
- Đăng nhập bảo mật (JWT)
- Xem tin nhắn từ guests
- Thống kê và quản lý tin nhắn
- Cập nhật trạng thái

## 🔐 Thông tin đăng nhập

**Admin Account**
```
Username: admin
Password: admin123
```

## 🗄️ Database

```
Database: atera_db
Username: atera_user
Password: Atera@2024#Secure
```

## 🛠️ Tech Stack

**Backend**: Spring Boot 3.2.1 + Spring Security + JWT + MySQL  
**Frontend**: React 18 + Vite + Tailwind CSS + React Router

## 📞 Hỗ trợ

Xem file [QUICK-START.md](./QUICK-START.md) để bắt đầu nhanh!

---

**© 2026 ATERA PHỐ NỐI - All rights reserved**
