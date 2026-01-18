# 🚀 HƯỚNG DẪN NHANH - ATERA LANDING PAGE

## 📋 Tổng quan
Landing page bất động sản với admin panel đơn giản để xem tin nhắn từ guests.

---

## 🗄️ BƯỚC 1: TẠO DATABASE

### Thông tin Database:
```
Database: atera_db
Username: atera_user
Password: Atera@2024#Secure
```

### Chạy script SQL:
```bash
# Option 1: MySQL Command Line
mysql -u root -p < setup-database.sql

# Option 2: Copy và paste vào MySQL Workbench/phpMyAdmin
```

**File**: `setup-database.sql` (đã có sẵn)

---

## 🖥️ BƯỚC 2: CHẠY BACKEND

```bash
cd backend
mvn spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080**

Tự động tạo:
- ✅ Tables trong MySQL
- ✅ Admin account (admin/admin123)
- ✅ Sample project data

---

## 🌐 BƯỚC 3: CHẠY FRONTEND

```bash
cd frontend
npm install  # Lần đầu tiên
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

---

## 🔑 ĐĂNG NHẬP ADMIN

**URL**: http://localhost:5173/admin/login

```
Username: admin
Password: admin123
```

---

## 📱 CÁC TRANG

| Trang | URL | Quyền truy cập |
|-------|-----|----------------|
| Landing Page | http://localhost:5173/ | Public |
| Admin Login | http://localhost:5173/admin/login | Public |
| Admin Dashboard | http://localhost:5173/admin/dashboard | ADMIN only |

---

## 🎯 TÍNH NĂNG

### Landing Page (Public)
- ✅ Xem thông tin dự án
- ✅ Xem hình ảnh, mặt bằng, tiện ích
- ✅ Gửi form liên hệ (guests)

### Admin Dashboard
- ✅ Xem danh sách tin nhắn từ guests
- ✅ Thống kê (Tổng, Mới, Đã liên hệ, Chuyển đổi)
- ✅ Filter theo trạng thái
- ✅ Cập nhật trạng thái tin nhắn:
  - Mới
  - Đã liên hệ
  - Quan tâm
  - Hẹn gặp
  - Đã chuyển đổi
  - Không quan tâm
  - Spam

---

## 🗂️ CẤU TRÚC DATABASE

### Table: users
- Admin accounts

### Table: contacts
- Tin nhắn từ guests (full_name, email, phone, message, status)

### Table: projects
- Thông tin dự án BĐS

### Tables khác:
- product_types (Shophouse, Villa, Townhouse)
- amenities (Tiện ích)
- gallery_images (Hình ảnh)

---

## 🔧 CẤU HÌNH

### Backend (application.yml)
```yaml
spring.datasource.url: jdbc:mysql://localhost:3306/atera_db
spring.datasource.username: atera_user
spring.datasource.password: Atera@2024#Secure
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api/v1
```

---

## 📡 API ENDPOINTS

### Public (Không cần token)
```
POST /api/v1/auth/login          # Đăng nhập admin
GET  /api/v1/public/project      # Xem thông tin dự án
POST /api/v1/public/contacts     # Guest gửi tin nhắn
```

### Admin (Cần JWT token)
```
GET    /api/v1/contacts          # Xem danh sách tin nhắn
PUT    /api/v1/contacts/{id}/status  # Cập nhật trạng thái
DELETE /api/v1/contacts/{id}     # Xóa tin nhắn
```

---

## 🐛 TROUBLESHOOTING

### Backend không start
```bash
# Kiểm tra MySQL đang chạy
net start MySQL80

# Kiểm tra database đã tạo
mysql -u atera_user -p atera_db
```

### Frontend không gọi được API
- Kiểm tra backend: http://localhost:8080
- Kiểm tra file `.env` có đúng URL không

### Login failed
- Username: `admin` (không phải Admin hay ADMIN)
- Password: `admin123`

---

## 📞 TÓM TẮT

1. **Tạo database**: `mysql -u root -p < setup-database.sql`
2. **Chạy backend**: `cd backend && mvn spring-boot:run`
3. **Chạy frontend**: `cd frontend && npm run dev`
4. **Truy cập**: http://localhost:5173
5. **Admin login**: http://localhost:5173/admin/login (admin/admin123)

---

✅ **Xong! Hệ thống sẵn sàng sử dụng!**
