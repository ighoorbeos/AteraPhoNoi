# 🔐 Hướng Dẫn Authentication & Authorization

## 📋 Tài Khoản Mặc Định

### Admin Account
```
Username: admin
Password: admin123
Email: admin@atera.vn
Role: ADMIN
```

## 🚀 Cách Đăng Nhập

### 1. Chạy Backend
```bash
cd backend
mvn spring-boot:run
```
Backend sẽ chạy tại: http://localhost:8080

### 2. Chạy Frontend
```bash
cd frontend
npm run dev
```
Frontend sẽ tự động mở browser tại: http://localhost:5173

### 3. Đăng Nhập Admin
- Click vào link **"Admin"** ở góc phải Header
- Hoặc truy cập trực tiếp: http://localhost:5173/admin/login
- Nhập thông tin:
  - Username: `admin`
  - Password: `admin123`
- Click "Đăng nhập"

## 🔑 Luồng Authentication

```
User nhập username/password
       ↓
Frontend gửi POST /api/v1/auth/login
       ↓
Backend xác thực & tạo JWT token
       ↓
Frontend lưu token vào localStorage
       ↓
Mọi request sau đều kèm token trong header
       ↓
Backend verify token & authorize
```

## 📡 API Endpoints

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "username": "admin",
  "password": "admin123"
}

Response (Success):
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
  }
}

Response (Error):
{
  "success": false,
  "message": "Tên đăng nhập hoặc mật khẩu không đúng",
  "error": "INVALID_CREDENTIALS"
}
```

### Logout
Frontend chỉ cần xóa token khỏi localStorage:
```javascript
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## 🛡️ Protected Routes

### Frontend Protection (React Router)
```javascript
// Chỉ ADMIN mới truy cập được
<Route 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute requiredRoles={['ADMIN']}>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

### Backend Protection (Spring Security)
```java
// Chỉ ADMIN mới gọi được
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/api/v1/contacts")
public ResponseEntity<?> getAllContacts() {
    // ...
}
```

## 🔒 Token Storage

### LocalStorage
```javascript
// Lưu token
localStorage.setItem('token', accessToken);
localStorage.setItem('user', JSON.stringify(user));

// Đọc token
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Xóa token (logout)
localStorage.removeItem('token');
localStorage.removeItem('user');
```

## 🔄 Axios Interceptors

### Request Interceptor (Tự động gửi token)
```javascript
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Interceptor (Xử lý lỗi 401)
```javascript
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
```

## 🧪 Test Authentication

### 1. Test Login API (Postman/curl)
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### 2. Test Protected Endpoint
```bash
curl -X GET http://localhost:8080/api/v1/contacts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Test Frontend
1. Mở DevTools (F12) → Console
2. Đăng nhập
3. Kiểm tra localStorage:
   ```javascript
   console.log(localStorage.getItem('token'));
   console.log(localStorage.getItem('user'));
   ```
4. Kiểm tra Network tab → Headers → Authorization

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to server"
✅ Kiểm tra backend đã chạy chưa (port 8080)
✅ Kiểm tra frontend proxy trong vite.config.js

### Lỗi: "Invalid credentials"
✅ Kiểm tra username/password đúng chưa: `admin` / `admin123`
✅ Kiểm tra database có user admin chưa

### Lỗi: "Token expired" hoặc 401
✅ Token mặc định hết hạn sau 24h
✅ Đăng nhập lại để lấy token mới
✅ Kiểm tra JWT secret key trong application.yml

### Lỗi: "403 Forbidden"
✅ User không có quyền ADMIN
✅ Kiểm tra role trong database: phải là `ADMIN`

### Database chưa có admin user
Chạy lại backend, DataInitializer sẽ tự động tạo:
```bash
cd backend
mvn spring-boot:run
```

## 🔐 Security Best Practices

✅ **Token Storage**: Sử dụng httpOnly cookies (hiện tại dùng localStorage cho đơn giản)
✅ **Token Expiration**: Token hết hạn sau 24h
✅ **Password Hashing**: Sử dụng BCrypt
✅ **CORS Configuration**: Chỉ cho phép frontend domain
✅ **HTTPS**: Production phải dùng HTTPS
✅ **Refresh Token**: TODO - Implement refresh token mechanism

## 📝 Notes

- Token được lưu trong localStorage (client-side)
- Token format: `Bearer {accessToken}`
- Token được gửi trong header `Authorization`
- Backend verify token bằng JWT secret key
- Token hết hạn sau 24 giờ (86400000ms)
- Role hiện tại chỉ có: `ADMIN`

---

✅ **Authentication flow đã được thiết kế và kiểm tra kỹ càng!**
