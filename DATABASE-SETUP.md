# HƯỚNG DẪN TẠO DATABASE MYSQL CHO ATERA LANDING PAGE

## 📋 Thông tin Database

- **Database name**: `atera_db`
- **Username**: `atera_user`
- **Password**: `Atera@2024#Secure`
- **Root password**: `root` (hoặc password root hiện tại của bạn)
- **Port**: `3306` (default)

---

## 🔧 Cách 1: Sử dụng MySQL Command Line

### Bước 1: Đăng nhập MySQL với tài khoản root

```bash
mysql -u root -p
```

Nhập password root của bạn khi được yêu cầu.

### Bước 2: Chạy các lệnh SQL sau

```sql
-- Tạo database
CREATE DATABASE IF NOT EXISTS atera_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Tạo user cho ứng dụng
CREATE USER IF NOT EXISTS 'atera_user'@'localhost' IDENTIFIED BY 'Atera@2024#Secure';
CREATE USER IF NOT EXISTS 'atera_user'@'%' IDENTIFIED BY 'Atera@2024#Secure';

-- Cấp quyền cho user
GRANT ALL PRIVILEGES ON atera_db.* TO 'atera_user'@'localhost';
GRANT ALL PRIVILEGES ON atera_db.* TO 'atera_user'@'%';

-- Áp dụng thay đổi
FLUSH PRIVILEGES;

-- Kiểm tra database đã tạo
SHOW DATABASES LIKE 'atera_db';

-- Kiểm tra user đã tạo
SELECT user, host FROM mysql.user WHERE user = 'atera_user';
```

### Bước 3: Thoát MySQL

```sql
EXIT;
```

---

## 🔧 Cách 2: Sử dụng MySQL Workbench

1. Mở **MySQL Workbench**
2. Kết nối đến MySQL server với tài khoản root
3. Vào **File** → **Open SQL Script**
4. Chọn file `setup-database.sql` (được tạo bên dưới)
5. Click vào icon **Execute** (⚡) để chạy script

---

## 🔧 Cách 3: Sử dụng phpMyAdmin

1. Mở **phpMyAdmin** trong trình duyệt
2. Đăng nhập với tài khoản root
3. Click vào tab **SQL**
4. Copy và paste nội dung file `setup-database.sql`
5. Click **Go** để thực thi

---

## 📝 File SQL Script (setup-database.sql)

Tạo file `setup-database.sql` với nội dung sau:

```sql
-- ========================================
-- ATERA LANDING PAGE - DATABASE SETUP
-- ========================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS atera_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE atera_db;

-- Tạo user cho ứng dụng
CREATE USER IF NOT EXISTS 'atera_user'@'localhost' IDENTIFIED BY 'Atera@2024#Secure';
CREATE USER IF NOT EXISTS 'atera_user'@'%' IDENTIFIED BY 'Atera@2024#Secure';

-- Cấp quyền CRUD cho user
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER 
ON atera_db.* TO 'atera_user'@'localhost';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER 
ON atera_db.* TO 'atera_user'@'%';

-- Áp dụng thay đổi
FLUSH PRIVILEGES;

-- Hiển thị thông tin
SELECT 'Database created successfully!' as Status;
SHOW DATABASES LIKE 'atera_db';
SELECT user, host FROM mysql.user WHERE user = 'atera_user';
```

---

## ✅ Kiểm tra kết nối

Sau khi tạo database, kiểm tra kết nối:

```bash
mysql -u atera_user -p atera_db
# Nhập password: Atera@2024#Secure
```

Nếu đăng nhập thành công, database đã sẵn sàng!

---

## 🚀 Chạy Backend Spring Boot

Sau khi tạo database, chạy lệnh:

```bash
cd E:\Semester9\BDS\atera-landing-page\backend
mvn spring-boot:run
```

Spring Boot sẽ tự động:
- Kết nối đến MySQL database `atera_db`
- Tạo các bảng theo JPA entities (users, contacts, projects, product_types, amenities, gallery_images)
- Khởi tạo dữ liệu mẫu (admin user, sales user, project data)

---

## 🔐 Thông tin đăng nhập mặc định

### Admin Account (Quản trị viên)
- Username: `admin`
- Password: `admin123`
- Role: ADMIN (xem và quản lý tin nhắn từ guests)

---

## 📊 Cấu trúc Database

Sau khi chạy backend, database sẽ có các bảng:

1. **users** - Tài khoản admin
2. **contacts** - Tin nhắn liên hệ từ guests
3. **projects** - Thông tin dự án BĐS
4. **product_types** - Các loại sản phẩm (Shophouse, Villa, Townhouse)
5. **amenities** - Tiện ích dự án
6. **gallery_images** - Hình ảnh gallery

---

## ⚠️ Lưu ý

1. **Đổi password trong production**: Password `Atera@2024#Secure` chỉ dùng cho development
2. **Backup database**: Định kỳ backup database trước khi update
3. **Port 3306**: Đảm bảo MySQL đang chạy trên port 3306
4. **Firewall**: Mở port 3306 nếu cần truy cập từ xa

---

## 🐛 Troubleshooting

### Lỗi: Access denied for user 'atera_user'
```bash
# Kiểm tra lại password và permissions
mysql -u root -p
GRANT ALL PRIVILEGES ON atera_db.* TO 'atera_user'@'localhost';
FLUSH PRIVILEGES;
```

### Lỗi: Unknown database 'atera_db'
```bash
# Tạo lại database
mysql -u root -p
CREATE DATABASE atera_db;
```

### Lỗi: Can't connect to MySQL server
```bash
# Kiểm tra MySQL service đang chạy
# Windows:
net start MySQL80

# Hoặc kiểm tra trong Services (services.msc)
```

---

## 📞 Cần hỗ trợ?

Nếu gặp vấn đề, kiểm tra:
1. MySQL service đang chạy
2. Port 3306 không bị block
3. Username/password chính xác
4. Database đã được tạo
