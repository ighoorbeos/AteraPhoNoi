# ATERA PHỐ NỐI - API Documentation

## Base URL
- Development: `http://localhost:8080/api/v1`
- Production: `https://api.atera-phonoi.vn/api/v1`

## Authentication
API sử dụng JWT (JSON Web Token) cho authentication.

### Headers
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

---

## 🔓 Public Endpoints (Không cần authentication)

### 1. Auth - Đăng nhập
```http
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400000,
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@atera.vn",
      "fullName": "Administrator",
      "role": "ADMIN"
    }
  },
  "timestamp": "2026-01-18T10:00:00"
}
```

### 2. Auth - Đăng ký
```http
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "username": "user1",
  "password": "password123",
  "email": "user1@email.com",
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567"
}
```

### 3. Contact - Gửi form liên hệ
```http
POST /api/v1/contacts
```

**Request Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@email.com",
  "phone": "0901234567",
  "message": "Tôi muốn tìm hiểu về dự án",
  "interestType": "SHOPHOUSE"
}
```

**Interest Types:**
- `SHOPHOUSE` - Quan tâm Shophouse
- `VILLA` - Quan tâm Biệt thự
- `TOWNHOUSE` - Quan tâm Liền kề
- `GENERAL` - Quan tâm chung

**Response:**
```json
{
  "success": true,
  "message": "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
  "data": {
    "id": 1,
    "fullName": "Nguyễn Văn A",
    "email": "nguyenvana@email.com",
    "phone": "0901234567",
    "status": "NEW",
    "createdAt": "2026-01-18T10:00:00"
  },
  "timestamp": "2026-01-18T10:00:00"
}
```

### 4. Project - Lấy thông tin dự án
```http
GET /api/v1/public/project
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "ATERA PHỐ NỐI",
    "slogan": "Điểm đến lý tưởng cho cuộc sống hiện đại",
    "description": "...",
    "address": "Phố Nối, Văn Lâm, Hưng Yên",
    "totalArea": 15.2,
    "totalUnits": 500,
    "buildingDensity": 35.0,
    "productTypes": [...],
    "amenities": [...],
    "galleryImages": [...]
  }
}
```

---

## 🔐 Protected Endpoints (Cần authentication)

### 5. Contacts - Danh sách liên hệ (ADMIN, SALES)
```http
GET /api/v1/contacts?page=0&size=20
```

**Query Parameters:**
- `page` - Số trang (bắt đầu từ 0)
- `size` - Số items mỗi trang
- `sort` - Sắp xếp (vd: `createdAt,desc`)

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": 1,
        "fullName": "Nguyễn Văn A",
        "email": "nguyenvana@email.com",
        "phone": "0901234567",
        "status": "NEW",
        "createdAt": "2026-01-18T10:00:00"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5,
    "first": true,
    "last": false
  }
}
```

### 6. Contacts - Chi tiết liên hệ (ADMIN, SALES)
```http
GET /api/v1/contacts/{id}
```

### 7. Contacts - Lọc theo trạng thái (ADMIN, SALES)
```http
GET /api/v1/contacts/status/{status}?page=0&size=20
```

**Status Values:**
- `NEW` - Mới
- `CONTACTED` - Đã liên hệ
- `INTERESTED` - Quan tâm
- `MEETING_SCHEDULED` - Đã hẹn gặp
- `CONVERTED` - Đã chuyển đổi
- `NOT_INTERESTED` - Không quan tâm
- `SPAM` - Spam

### 8. Contacts - Cập nhật trạng thái (ADMIN, SALES)
```http
PATCH /api/v1/contacts/{id}/status
```

**Request Body:**
```json
{
  "status": "CONTACTED",
  "notes": "Đã gọi điện tư vấn",
  "assignedToId": 2
}
```

### 9. Contacts - Thống kê (ADMIN only)
```http
GET /api/v1/contacts/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "NEW": 50,
    "CONTACTED": 30,
    "INTERESTED": 15,
    "MEETING_SCHEDULED": 10,
    "CONVERTED": 5,
    "NOT_INTERESTED": 8,
    "SPAM": 2,
    "TOTAL": 120
  }
}
```

### 10. Contacts - Xóa liên hệ (ADMIN only)
```http
DELETE /api/v1/contacts/{id}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "email": "Email không hợp lệ",
    "phone": "Số điện thoại không hợp lệ"
  },
  "timestamp": "2026-01-18T10:00:00"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Tên đăng nhập hoặc mật khẩu không đúng",
  "timestamp": "2026-01-18T10:00:00"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Bạn không có quyền truy cập",
  "timestamp": "2026-01-18T10:00:00"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Contact not found",
  "timestamp": "2026-01-18T10:00:00"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Đã xảy ra lỗi. Vui lòng thử lại sau.",
  "timestamp": "2026-01-18T10:00:00"
}
```

---

## Default Accounts

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| admin | admin123 | ADMIN | Quản trị viên |
| sales | sales123 | SALES | Nhân viên kinh doanh |

---

## Role Permissions

| Endpoint | ADMIN | SALES | USER | Public |
|----------|-------|-------|------|--------|
| POST /auth/login | ✅ | ✅ | ✅ | ✅ |
| POST /auth/register | ✅ | ✅ | ✅ | ✅ |
| POST /contacts | ✅ | ✅ | ✅ | ✅ |
| GET /public/project | ✅ | ✅ | ✅ | ✅ |
| GET /contacts | ✅ | ✅ | ❌ | ❌ |
| GET /contacts/{id} | ✅ | ✅ | ❌ | ❌ |
| PATCH /contacts/{id}/status | ✅ | ✅ | ❌ | ❌ |
| GET /contacts/statistics | ✅ | ❌ | ❌ | ❌ |
| DELETE /contacts/{id} | ✅ | ❌ | ❌ | ❌ |
