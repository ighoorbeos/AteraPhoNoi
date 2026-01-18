# Hướng Dẫn Setup Project ATERA Phố Nối

## 📋 Yêu Cầu Hệ Thống

- **Java**: JDK 17 trở lên
- **Node.js**: v18 trở lên
- **MySQL**: v8.0 trở lên
- **Maven**: v3.6 trở lên (hoặc dùng Maven wrapper có sẵn)

---

## 🛠️ Bước 1: Cài Đặt Các Tool Cần Thiết

### 1.1. Cài Java JDK 17
- Tải về: https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
- Hoặc dùng OpenJDK: https://adoptium.net/
- Sau khi cài xong, kiểm tra:
```bash
java -version
```

### 1.2. Cài Node.js
- Tải về: https://nodejs.org/ (chọn bản LTS)
- Sau khi cài xong, kiểm tra:
```bash
node -v
npm -v
```

### 1.3. Cài MySQL
- Tải về: https://dev.mysql.com/downloads/mysql/
- Hoặc dùng XAMPP: https://www.apachefriends.org/
- Sau khi cài xong, khởi động MySQL service
- Tạo user và password (mặc định: `root` / `password`)

### 1.4. Cài Maven (Tùy chọn)
- Tải về: https://maven.apache.org/download.cgi
- Hoặc dùng Maven wrapper có sẵn trong project (`mvnw` trên Windows)

---

## 📥 Bước 2: Clone Repository

```bash
git clone https://github.com/ighoorbeos/AteraPhoNoi.git
cd AteraPhoNoi
```

---

## 🗄️ Bước 3: Setup Database

### 3.1. Tạo Database
Mở MySQL Workbench hoặc command line:

```sql
CREATE DATABASE atera_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3.2. Tạo User (Tùy chọn - nếu không dùng root)
```sql
CREATE USER 'atera_user'@'localhost' IDENTIFIED BY 'atera_password';
GRANT ALL PRIVILEGES ON atera_db.* TO 'atera_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3.3. Import Database Schema (Tùy chọn)
Nếu có file `setup-database.sql`:
```bash
mysql -u root -p atera_db < setup-database.sql
```

**Lưu ý**: Spring Boot sẽ tự động tạo bảng khi chạy lần đầu nhờ Hibernate.

---

## ⚙️ Bước 4: Cấu Hình Backend

### 4.1. Cập nhật thông tin database
Mở file `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/atera_db?useSSL=false&serverTimezone=Asia/Ho_Chi_Minh&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true
    username: root          # Đổi thành username MySQL của bạn
    password: password      # Đổi thành password MySQL của bạn
```

### 4.2. Build Backend
```bash
cd backend
mvn clean install

# Hoặc dùng Maven wrapper trên Windows
.\mvnw.cmd clean install

# Hoặc trên Linux/Mac
./mvnw clean install
```

### 4.3. Chạy Backend
```bash
# Cách 1: Dùng Maven
mvn spring-boot:run

# Cách 2: Chạy JAR file
java -jar target/atera-landing-api-1.0.0.jar
```

Backend sẽ chạy tại: **http://localhost:8080**

---

## 🎨 Bước 5: Cấu Hình Frontend

### 5.1. Cài đặt dependencies
```bash
cd frontend
npm install
```

### 5.2. Cấu hình API URL (nếu cần)
Kiểm tra file `frontend/.env`:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

### 5.3. Chạy Frontend
```bash
npm run dev
```

Frontend sẽ tự động mở tại: **http://localhost:5173**

---

## 🚀 Bước 6: Đăng Nhập Admin

Sau khi backend chạy lần đầu, hệ thống tự động tạo tài khoản admin:

- **Username**: `admin`
- **Password**: `admin123`

Truy cập admin panel:
1. Scroll xuống footer trang chủ
2. Click vào icon ⚙️ (settings) bên cạnh Instagram
3. Hoặc truy cập trực tiếp: http://localhost:5173/admin/login

---

## 🐳 (Tùy chọn) Chạy với Docker

Nếu đã cài Docker và Docker Compose:

```bash
# Chạy toàn bộ stack (Backend + Frontend + MySQL)
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

---

## 📝 Kiểm Tra Hoạt Động

### Backend
- API Documentation: http://localhost:8080/h2-console (nếu bật H2)
- Health check: http://localhost:8080/api/v1/health

### Frontend
- Trang chủ: http://localhost:5173
- Admin login: http://localhost:5173/admin/login

---

## ❗ Xử Lý Lỗi Thường Gặp

### 1. Backend không kết nối được MySQL
```
Error: Communications link failure
```
**Giải pháp**:
- Kiểm tra MySQL đã chạy chưa
- Kiểm tra username/password trong `application.yml`
- Kiểm tra port MySQL (mặc định 3306)

### 2. Frontend không gọi được API
```
CORS error hoặc Network error
```
**Giải pháp**:
- Kiểm tra backend đã chạy chưa (http://localhost:8080)
- Kiểm tra `VITE_API_URL` trong file `.env`

### 3. Port đã được sử dụng
```
Port 8080 is already in use
```
**Giải pháp**:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

---

## 📞 Support

Nếu gặp vấn đề, mở issue tại: https://github.com/ighoorbeos/AteraPhoNoi/issues

---

## 📄 License

Copyright © 2026 ATERA PHỐ NỐI
