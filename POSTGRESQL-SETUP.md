# Hướng Dẫn Cài Đặt và Cấu Hình PostgreSQL

## 📦 Bước 1: Tải và Cài Đặt PostgreSQL

### Windows

#### 1.1. Tải PostgreSQL
- Truy cập: https://www.postgresql.org/download/windows/
- Hoặc tải trực tiếp: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- Chọn phiên bản mới nhất (PostgreSQL 16.x recommended)

#### 1.2. Cài Đặt
1. Chạy file installer (ví dụ: `postgresql-16.x-windows-x64.exe`)
2. **Installation Directory**: Để mặc định `C:\Program Files\PostgreSQL\16`
3. **Select Components**: Chọn tất cả
   - PostgreSQL Server
   - pgAdmin 4 (GUI tool)
   - Stack Builder
   - Command Line Tools
4. **Data Directory**: Để mặc định `C:\Program Files\PostgreSQL\16\data`
5. **Password**: Nhập password cho user `postgres` (ví dụ: `postgres` hoặc `admin123`)
   - ⚠️ **QUAN TRỌNG**: Ghi nhớ password này!
6. **Port**: Để mặc định `5432`
7. **Locale**: Chọn `Vietnamese, Vietnam` hoặc `English, United States`
8. Click **Next** và chờ cài đặt hoàn tất

#### 1.3. Kiểm tra cài đặt
Mở Command Prompt hoặc PowerShell:
```bash
psql --version
# Output: psql (PostgreSQL) 16.x
```

### macOS

#### 1.1. Cài đặt qua Homebrew (Recommended)
```bash
# Cài Homebrew nếu chưa có
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài PostgreSQL
brew install postgresql@16

# Khởi động PostgreSQL service
brew services start postgresql@16

# Kiểm tra
psql --version
```

#### 1.2. Hoặc tải installer
- Truy cập: https://www.postgresql.org/download/macosx/
- Chọn Postgres.app hoặc EDB installer

### Linux (Ubuntu/Debian)

```bash
# Update package list
sudo apt update

# Cài PostgreSQL
sudo apt install postgresql postgresql-contrib

# Kiểm tra service
sudo systemctl status postgresql

# Kiểm tra version
psql --version
```

---

## 🔧 Bước 2: Cấu Hình PostgreSQL

### 2.1. Kết nối vào PostgreSQL

#### Windows:
```bash
# Mở Command Prompt/PowerShell
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres

# Hoặc mở pgAdmin 4 từ Start Menu
```

#### macOS/Linux:
```bash
# Kết nối với user postgres
sudo -u postgres psql

# Hoặc nếu đã config user
psql -U postgres
```

### 2.2. Tạo Database và User

Sau khi vào PostgreSQL prompt (`postgres=#`):

```sql
-- Tạo database
CREATE DATABASE atera_db
    WITH ENCODING 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

-- Tạo user
CREATE USER atera_user WITH ENCRYPTED PASSWORD 'Atera@2024#Secure';

-- Gán quyền cho user
GRANT ALL PRIVILEGES ON DATABASE atera_db TO atera_user;

-- Kết nối vào database atera_db
\c atera_db

-- Gán quyền schema (PostgreSQL 15+)
GRANT ALL ON SCHEMA public TO atera_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO atera_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO atera_user;

-- Set default privileges cho các bảng mới
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO atera_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO atera_user;

-- Kiểm tra
\l          -- List databases
\du         -- List users
```

### 2.3. Thoát khỏi PostgreSQL
```sql
\q
-- Hoặc
exit
```

---

## 🔐 Bước 3: Cấu Hình Truy Cập (Nếu Cần)

### 3.1. Cho phép kết nối từ localhost

#### Windows:
Mở file `pg_hba.conf`:
```
C:\Program Files\PostgreSQL\16\data\pg_hba.conf
```

#### Linux/macOS:
```bash
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Thêm hoặc sửa dòng sau:
```conf
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

### 3.2. Restart PostgreSQL

#### Windows:
```bash
# Mở Services (Win + R → services.msc)
# Tìm "postgresql-x64-16" → Right-click → Restart

# Hoặc dùng command
net stop postgresql-x64-16
net start postgresql-x64-16
```

#### macOS (Homebrew):
```bash
brew services restart postgresql@16
```

#### Linux:
```bash
sudo systemctl restart postgresql
```

---

## 🎯 Bước 4: Cấu Hình Project

### 4.1. Update pom.xml (Đã thực hiện)

File `backend/pom.xml` đã được cập nhật:
```xml
<!-- PostgreSQL Driver -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 4.2. Update application.yml (Đã thực hiện)

File `backend/src/main/resources/application.yml` đã được cập nhật:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/atera_db
    driver-class-name: org.postgresql.Driver
    username: atera_user
    password: Atera@2024#Secure
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
```

### 4.3. Build và Chạy Backend

```bash
cd backend

# Clean và build
mvn clean install

# Chạy application
java -jar target/atera-landing-api-1.0.0.jar

# Hoặc dùng Maven
mvn spring-boot:run
```

---

## ✅ Bước 5: Kiểm Tra Kết Nối

### 5.1. Kiểm tra từ Terminal

```bash
# Kết nối vào database
psql -U atera_user -d atera_db -h localhost

# Liệt kê các bảng
\dt

# Kiểm tra dữ liệu user
SELECT * FROM users;

# Thoát
\q
```

### 5.2. Kiểm tra qua pgAdmin 4

1. Mở **pgAdmin 4** từ Start Menu (Windows) hoặc Applications (macOS)
2. Kết nối server (password: `postgres` hoặc password bạn đã đặt)
3. Expand: **Servers → PostgreSQL 16 → Databases → atera_db**
4. Xem **Schemas → public → Tables**

### 5.3. Kiểm tra Backend Log

Khi backend chạy, log sẽ hiển thị:
```
HikariPool-1 - Starting...
HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@xxxxx
HikariPool-1 - Start completed.
```

---

## 🔍 So Sánh MySQL vs PostgreSQL

| Feature | MySQL | PostgreSQL |
|---------|-------|------------|
| **Port** | 3306 | 5432 |
| **Driver** | `com.mysql.cj.jdbc.Driver` | `org.postgresql.Driver` |
| **URL Format** | `jdbc:mysql://host:3306/db` | `jdbc:postgresql://host:5432/db` |
| **Dialect** | `MySQL8Dialect` | `PostgreSQLDialect` |
| **Admin Tool** | MySQL Workbench | pgAdmin 4 |
| **Performance** | Faster for read-heavy | Better for complex queries |
| **Standards** | Less compliant | SQL standard compliant |

---

## 📊 Các Lệnh Hữu Ích

### PostgreSQL Commands

```sql
-- Kết nối database
\c atera_db

-- Liệt kê databases
\l

-- Liệt kê tables
\dt

-- Mô tả cấu trúc table
\d users

-- Liệt kê users
\du

-- Xem schema
\dn

-- Thoát
\q

-- Clear màn hình
\! cls   (Windows)
\! clear (Linux/macOS)

-- Xem version
SELECT version();

-- Xem active connections
SELECT * FROM pg_stat_activity WHERE datname = 'atera_db';
```

---

## ❗ Xử Lý Lỗi

### 1. "psql: command not found"

**Windows:**
Thêm PostgreSQL vào PATH:
```
C:\Program Files\PostgreSQL\16\bin
```

**macOS/Linux:**
```bash
export PATH="/usr/local/opt/postgresql@16/bin:$PATH"
```

### 2. "FATAL: password authentication failed"

```bash
# Reset password
psql -U postgres
ALTER USER atera_user WITH PASSWORD 'Atera@2024#Secure';
```

### 3. "could not connect to server"

Kiểm tra service đang chạy:
```bash
# Windows
net start postgresql-x64-16

# macOS
brew services start postgresql@16

# Linux
sudo systemctl start postgresql
```

### 4. "permission denied for schema public"

```sql
\c atera_db
GRANT ALL ON SCHEMA public TO atera_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO atera_user;
```

---

## 🛠️ Tools Hữu Ích

1. **pgAdmin 4** (Đã có khi cài PostgreSQL)
   - GUI tool chính thức
   - Quản lý database, query, backup/restore

2. **DBeaver** (Free, cross-platform)
   - Download: https://dbeaver.io/
   - Hỗ trợ nhiều database

3. **DataGrip** (JetBrains - Paid)
   - Download: https://www.jetbrains.com/datagrip/
   - Tích hợp tốt với IntelliJ

4. **TablePlus** (macOS/Windows - Paid)
   - Download: https://tableplus.com/
   - Giao diện đẹp, nhanh

---

## 📝 Tạm Kết

✅ Đã chuyển từ MySQL sang PostgreSQL
✅ Database: `atera_db`
✅ User: `atera_user` / `Atera@2024#Secure`
✅ Port: `5432`
✅ Hibernate sẽ tự động tạo bảng khi chạy lần đầu

Bây giờ có thể chạy backend và frontend như bình thường! 🚀

---

## 🔗 Tài Liệu Tham Khảo

- PostgreSQL Official: https://www.postgresql.org/docs/
- Spring Data JPA + PostgreSQL: https://spring.io/guides/gs/accessing-data-jpa/
- pgAdmin Documentation: https://www.pgadmin.org/docs/
