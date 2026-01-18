# 📁 CẤU TRÚC DỰ ÁN ATERA - THEO CHUẨN

## 🎯 Frontend Structure (React + Vite)

```
frontend/src/
├── pages/                          # Tất cả các pages
│   ├── public/                     # Public pages
│   │   ├── HomePage.jsx            # / - Trang chủ
│   │   ├── OverviewPage.jsx        # /overview - Tổng quan
│   │   ├── LocationPage.jsx        # /location - Vị trí
│   │   ├── DesignPage.jsx          # /design - Thiết kế
│   │   ├── FloorPlansPage.jsx      # /floor-plans - Mặt bằng
│   │   ├── AmenitiesPage.jsx       # /amenities - Tiện ích
│   │   ├── GalleryPage.jsx         # /gallery - Thư viện ảnh
│   │   └── ContactPage.jsx         # /contact - Liên hệ
│   └── admin/                      # Admin pages
│       ├── LoginPage.jsx           # /admin/login
│       └── DashboardPage.jsx       # /admin/dashboard
│
├── components/                     # Reusable components
│   ├── Header.jsx                  # Navigation với router links
│   ├── Hero.jsx
│   ├── Overview.jsx
│   ├── Location.jsx
│   ├── Design.jsx
│   ├── FloorPlans.jsx
│   ├── Amenities.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── FloatingContact.jsx
│   └── ProtectedRoute.jsx          # Route guard
│
├── services/                       # API Services (Theo module)
│   ├── modules/                    # Services theo module
│   │   ├── auth.service.js         # Authentication
│   │   ├── project.service.js      # Project info
│   │   └── contact.service.js      # Contact management
│   ├── axios.config.js             # Axios instance config
│   └── index.js                    # Export tất cả services
│
├── routes/                         # Route definitions
│   ├── public.routes.jsx           # Public routes
│   ├── admin.routes.jsx            # Admin routes
│   └── index.js                    # Export routes
│
├── contexts/                       # React Contexts
│   └── AuthContext.jsx             # Authentication context
│
├── App.jsx                         # Main app với routing
└── main.jsx                        # Entry point
```

## 🎯 Backend Structure (Spring Boot)

```
backend/src/main/java/com/atera/
├── controller/                     # REST Controllers
│   ├── admin/                      # Admin controllers
│   │   └── AdminContactController.java
│   ├── pub/                        # Public controllers
│   │   ├── PublicProjectController.java
│   │   └── PublicContactController.java
│   └── AuthController.java         # Authentication
│
├── service/                        # Business Logic
│   ├── impl/                       # Service implementations
│   │   ├── AuthServiceImpl.java
│   │   ├── ContactServiceImpl.java
│   │   └── ProjectServiceImpl.java
│   ├── AuthService.java            # Interface
│   ├── ContactService.java
│   └── ProjectService.java
│
├── repository/                     # Data Access Layer
│   ├── UserRepository.java
│   ├── ContactRepository.java
│   ├── ProjectRepository.java
│   ├── ProductTypeRepository.java
│   ├── AmenityRepository.java
│   └── GalleryImageRepository.java
│
├── entity/                         # JPA Entities
│   ├── User.java
│   ├── Contact.java
│   ├── Project.java
│   ├── ProductType.java
│   ├── Amenity.java
│   └── GalleryImage.java
│
├── dto/                            # Data Transfer Objects
│   ├── request/                    # Request DTOs
│   │   ├── LoginRequest.java
│   │   ├── ContactRequest.java
│   │   └── UpdateContactStatusRequest.java
│   └── response/                   # Response DTOs
│       ├── LoginResponse.java
│       ├── ContactResponse.java
│       ├── ProjectResponse.java
│       ├── ApiResponse.java
│       └── PageResponse.java
│
├── security/                       # Security & JWT
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
│
├── config/                         # Configuration
│   ├── SecurityConfig.java         # Spring Security
│   ├── WebConfig.java              # CORS, etc
│   └── DataInitializer.java       # Init data
│
├── exception/                      # Exception Handling
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   └── ValidationException.java
│
└── AteraApplication.java           # Main class
```

## 🌐 Frontend Routes

### Public Routes (Không cần đăng nhập)

| Route | Component | Mô tả |
|-------|-----------|-------|
| `/` | HomePage | Trang chủ với Hero section |
| `/overview` | OverviewPage | Tổng quan dự án |
| `/location` | LocationPage | Vị trí, bản đồ |
| `/design` | DesignPage | Thiết kế nội thất |
| `/floor-plans` | FloorPlansPage | Mặt bằng căn hộ |
| `/amenities` | AmenitiesPage | Tiện ích dự án |
| `/gallery` | GalleryPage | Thư viện hình ảnh |
| `/contact` | ContactPage | Form liên hệ |

### Admin Routes (Cần đăng nhập)

| Route | Component | Quyền | Mô tả |
|-------|-----------|-------|-------|
| `/admin/login` | LoginPage | Public | Đăng nhập admin |
| `/admin/dashboard` | DashboardPage | ADMIN | Quản lý tin nhắn |

## 📡 API Endpoints Structure

### Public Endpoints
```
POST   /api/v1/auth/login
POST   /api/v1/public/contacts              # Guest gửi tin nhắn
GET    /api/v1/public/project                # Lấy thông tin dự án
GET    /api/v1/public/project/product-types
GET    /api/v1/public/project/amenities
GET    /api/v1/public/project/gallery
```

### Admin Endpoints (Cần JWT token)
```
GET    /api/v1/contacts                      # Lấy tất cả contacts
GET    /api/v1/contacts/{id}                 # Chi tiết contact
PUT    /api/v1/contacts/{id}/status          # Cập nhật trạng thái
DELETE /api/v1/contacts/{id}                 # Xóa contact
GET    /api/v1/contacts?status=NEW           # Filter theo status
```

## 🔧 Services Architecture

### Frontend Services

#### auth.service.js
```javascript
- login(username, password)
- logout()
- getCurrentUser()
- isAuthenticated()
```

#### project.service.js
```javascript
- getProjectInfo()
- getProductTypes()
- getAmenities()
- getGalleryImages(category)
```

#### contact.service.js
```javascript
- submitContact(contactData)      // Public
- getAll()                         // Admin
- getById(id)                      // Admin
- updateStatus(id, status)         // Admin
- delete(id)                       // Admin
- filterByStatus(status)           // Admin
```

## 📦 Package Organization

### Frontend
```
services/
  ├── modules/          # Services theo module
  ├── axios.config.js   # Axios instance
  └── index.js          # Export

routes/
  ├── public.routes.jsx
  ├── admin.routes.jsx
  └── index.js

pages/
  ├── public/           # Public pages
  └── admin/            # Admin pages
```

### Backend
```
com.atera/
  ├── controller/
  │   ├── admin/        # Admin controllers
  │   └── pub/          # Public controllers
  ├── service/
  │   └── impl/         # Implementations
  ├── dto/
  │   ├── request/      # Request DTOs
  │   └── response/     # Response DTOs
  └── ...
```

## ✅ Best Practices Implemented

### Frontend
✅ **Separation of Concerns**: Pages, Components, Services riêng biệt
✅ **Route Organization**: Public và Admin routes tách biệt
✅ **Service Layer**: API calls tập trung, dễ maintain
✅ **Module Pattern**: Services theo module (auth, project, contact)
✅ **Axios Interceptors**: Tự động thêm token, xử lý lỗi chung
✅ **Protected Routes**: Route guard cho admin
✅ **React Router**: Navigation với Link component

### Backend
✅ **Layered Architecture**: Controller → Service → Repository
✅ **Package by Feature**: Admin và Public controllers riêng
✅ **DTOs**: Request/Response DTOs tách biệt
✅ **Service Interface**: Interface + Implementation
✅ **Exception Handling**: Global exception handler
✅ **Security**: JWT authentication, role-based authorization
✅ **Data Validation**: Bean Validation
✅ **CORS Configuration**: Secure CORS setup

## 🚀 Development Workflow

### 1. Chạy Backend
```bash
cd backend
mvn spring-boot:run
```

### 2. Chạy Frontend
```bash
cd frontend
npm run dev
```

### 3. Truy cập
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/v1

## 📝 Naming Conventions

### Frontend
- **Pages**: `[Name]Page.jsx` (HomePage, LoginPage)
- **Components**: `[Name].jsx` (Header, Footer)
- **Services**: `[name].service.js` (auth.service.js)
- **Routes**: `[type].routes.jsx` (public.routes.jsx)

### Backend
- **Controllers**: `[Entity]Controller.java`
- **Services**: `[Entity]Service.java` + `[Entity]ServiceImpl.java`
- **Repositories**: `[Entity]Repository.java`
- **DTOs**: `[Entity][Type].java` (LoginRequest, ProjectResponse)
- **Entities**: `[Entity].java`

---

✅ **Cấu trúc đã hoàn chỉnh và chuẩn hóa!**
