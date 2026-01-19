# Hướng Dẫn Sử Dụng PostgreSQL Online (Cloud Database)

## 🌐 Tổng Quan

PostgreSQL Online là dịch vụ database cloud **MIỄN PHÍ**, không cần cài đặt gì trên máy!
Chỉ cần đăng ký, lấy connection string và connect vào project.

---

## 🎯 Các Nhà Cung Cấp PostgreSQL Miễn Phí

### 1. **Supabase** (Khuyên dùng ⭐)
- ✅ **Miễn phí**: 500MB database, unlimited API requests
- ✅ Giao diện đẹp, dễ dùng
- ✅ Có dashboard quản lý table, data
- ✅ Tích hợp sẵn Authentication, Storage
- 🔗 Website: https://supabase.com

### 2. **Neon**
- ✅ **Miễn phí**: 10GB storage
- ✅ Serverless PostgreSQL (tự động sleep khi không dùng)
- ✅ Nhanh, modern
- 🔗 Website: https://neon.tech

### 3. **Railway**
- ✅ **Miễn phí**: $5 credit/tháng
- ✅ Deploy cả backend + database
- ✅ Dễ dùng
- 🔗 Website: https://railway.app

### 4. **Render**
- ✅ **Miễn phí**: PostgreSQL instance
- ✅ Tự động backup
- ✅ 90 ngày lưu trữ database
- 🔗 Website: https://render.com

---

## 📝 Hướng Dẫn Chi Tiết: Supabase (Khuyên Dùng)

### Bước 1: Đăng Ký Tài Khoản

1. Truy cập: https://supabase.com
2. Click **"Start your project"**
3. Đăng nhập bằng:
   - GitHub (khuyên dùng - nhanh nhất)
   - Google
   - Email

### Bước 2: Tạo Project

1. Click **"New Project"**
2. Điền thông tin:
   - **Name**: `atera-pho-noi` (hoặc tên bạn muốn)
   - **Database Password**: Tạo password mạnh (VD: `Atera@2024#Secure`)
     - ⚠️ **LƯU LẠI PASSWORD NÀY!**
   - **Region**: Chọn **Southeast Asia (Singapore)** (gần VN nhất)
   - **Pricing Plan**: Chọn **Free** (miễn phí)
3. Click **"Create new project"**
4. Đợi ~2 phút để Supabase setup database

### Bước 3: Lấy Connection String

1. Vào project vừa tạo
2. Sidebar: Click **"Settings"** (icon bánh răng)
3. Click **"Database"**
4. Kéo xuống phần **"Connection string"**
5. Chọn tab **"URI"**
6. Copy chuỗi connection (dạng):
```
postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

7. **Quan trọng**: Thay `[YOUR-PASSWORD]` bằng password bạn đã tạo ở Bước 2

### Bước 4: Cấu Hình Project

Mở file `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    # Supabase PostgreSQL Connection
    url: postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
    driver-class-name: org.postgresql.Driver
    username: postgres
    password: [YOUR-PASSWORD]
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

**Thay thế**:
- `[YOUR-PASSWORD]`: Password bạn tạo ở Bước 2
- `xxxxxxxxxxxxx`: Project ID (có trong connection string)

### Bước 5: Chạy Backend

```bash
cd backend

# Build
mvn clean install

# Chạy
mvn spring-boot:run

# Hoặc
java -jar target/atera-landing-api-1.0.0.jar
```

Backend sẽ tự động:
- Kết nối với Supabase PostgreSQL
- Tạo các bảng (users, contacts, projects, etc.)
- Insert data mẫu

### Bước 6: Kiểm Tra Trên Supabase Dashboard

1. Vào Supabase Dashboard
2. Sidebar: Click **"Table Editor"**
3. Bạn sẽ thấy các bảng được tạo:
   - `users`
   - `contacts`
   - `projects`
   - `amenities`
   - `gallery_images`
   - `product_types`

4. Click vào bảng `users` để xem tài khoản admin đã được tạo

### Bước 7: Query Trực Tiếp (Tùy Chọn)

Trong Supabase Dashboard:
1. Sidebar: Click **"SQL Editor"**
2. Chạy query:

```sql
-- Xem tất cả users
SELECT * FROM users;

-- Xem contacts
SELECT * FROM contacts;

-- Xem projects
SELECT * FROM projects;
```

---

## 📝 Hướng Dẫn Chi Tiết: Neon

### Bước 1: Đăng Ký

1. Truy cập: https://neon.tech
2. Click **"Sign up"**
3. Đăng nhập bằng GitHub/Google

### Bước 2: Tạo Project

1. Click **"Create a project"**
2. Điền:
   - **Project name**: `atera-pho-noi`
   - **Region**: **Singapore** (aws-ap-southeast-1)
   - **Postgres version**: 16 (mới nhất)
3. Click **"Create project"**

### Bước 3: Lấy Connection String

1. Trong project dashboard
2. Phần **"Connection Details"**
3. Copy **"Connection string"**:
```
postgresql://username:password@ep-xxxx-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

### Bước 4: Cấu Hình Project

```yaml
spring:
  datasource:
    url: postgresql://username:password@ep-xxxx-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
    driver-class-name: org.postgresql.Driver
    username: username  # Có trong connection string
    password: password  # Có trong connection string
```

---

## 🚀 So Sánh Các Nền Tảng

| Feature | Supabase | Neon | Railway | Render |
|---------|----------|------|---------|--------|
| **Free Storage** | 500MB | 10GB | ~500MB | 256MB |
| **Dashboard** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Speed** | Nhanh | Rất nhanh | Trung bình | Trung bình |
| **Auto-pause** | ❌ | ✅ | ✅ | ❌ |
| **Backup** | ✅ | ✅ | ✅ | ✅ |
| **Region VN** | Singapore | Singapore | Singapore | Singapore |
| **Extra Features** | Auth, Storage | Branching | Deploy | CI/CD |

**Khuyên dùng**: 
- **Supabase** - Nếu muốn giao diện đẹp, nhiều tính năng
- **Neon** - Nếu muốn storage lớn (10GB), serverless

---

## ⚙️ Cấu Hình Connection Pool Tối Ưu

Với database online, nên giảm connection pool để tránh vượt quá giới hạn:

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 5      # Giảm từ 10 xuống 5
      minimum-idle: 2           # Giảm từ 5 xuống 2
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

---

## ✅ Ưu Điểm PostgreSQL Online

✅ **Không cần cài đặt** - Chỉ cần connection string
✅ **Miễn phí** - Đủ cho development và small projects
✅ **Tự động backup** - Không lo mất data
✅ **Scalable** - Dễ nâng cấp khi cần
✅ **Dashboard đẹp** - Quản lý data trực quan
✅ **SSL/TLS** - Bảo mật cao
✅ **Uptime cao** - 99.9% availability

---

## ❌ Nhược Điểm

❌ **Phụ thuộc internet** - Cần internet để kết nối
❌ **Latency cao hơn local** - Ping ~50-100ms (Singapore → VN)
❌ **Giới hạn free tier** - Storage, requests limit
❌ **Không tùy chỉnh server** - Không thể config PostgreSQL như local

---

## 🔐 Bảo Mật

### 1. Không commit connection string lên GitHub!

Tạo file `.env` (đã có trong `.gitignore`):
```properties
# backend/.env
DATASOURCE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
DATASOURCE_USERNAME=postgres
DATASOURCE_PASSWORD=Atera@2024#Secure
```

### 2. Sử dụng environment variables

Sửa `application.yml`:
```yaml
spring:
  datasource:
    url: ${DATASOURCE_URL}
    username: ${DATASOURCE_USERNAME}
    password: ${DATASOURCE_PASSWORD}
```

### 3. Production: Dùng Secret Manager
- AWS Secrets Manager
- Azure Key Vault
- Environment variables trên hosting platform

---

## 📊 Monitoring

### Supabase Dashboard
- **Database**: Xem size, connections
- **API**: Monitor API calls
- **Logs**: Real-time logs

### Neon Dashboard
- **Metrics**: CPU, RAM usage
- **Storage**: Database size
- **Connections**: Active connections

---

## 🆓 Khi Nào Nên Upgrade?

Free tier đủ cho:
- ✅ Development
- ✅ Side projects
- ✅ MVPs
- ✅ Small startups (<1000 users)

Nên upgrade khi:
- ❌ Database > 500MB (Supabase) / 10GB (Neon)
- ❌ Traffic cao (>10k requests/day)
- ❌ Cần real-time features
- ❌ Cần multi-region

---

## 📞 Support & Docs

### Supabase
- Docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
- GitHub: https://github.com/supabase/supabase

### Neon
- Docs: https://neon.tech/docs
- Discord: https://discord.gg/neon
- Status: https://status.neon.tech

---

## 🎓 Tóm Tắt

1. **Đăng ký Supabase** (hoặc Neon)
2. **Tạo project** → Lấy connection string
3. **Copy vào application.yml**
4. **Chạy backend** → Tự động tạo tables
5. **Xem data** trên Dashboard

✅ Không cần cài PostgreSQL trên máy!
✅ Hoàn toàn miễn phí!
✅ Có thể access từ bất kỳ đâu!

---

## 🔄 Migration từ Local sang Cloud

Nếu đang dùng PostgreSQL local và muốn chuyển sang cloud:

```bash
# 1. Dump database local
pg_dump -U postgres atera_db > backup.sql

# 2. Import vào Supabase (dùng connection string từ Supabase)
psql "postgresql://postgres.xxxxx:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres" < backup.sql
```

Hoặc đơn giản để Hibernate tự động tạo lại tables (vì có ddl-auto: update)
