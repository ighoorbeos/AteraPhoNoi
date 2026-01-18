# ATERA PHỐ NỐI - Landing Page

Dự án Landing Page quảng bá bất động sản ATERA PHỐ NỐI.

## 📁 Cấu trúc dự án

```
atera-landing-page/
├── backend/                    # Spring Boot API
│   ├── src/
│   │   └── main/
│   │       ├── java/com/atera/
│   │       │   ├── config/     # Cấu hình Spring
│   │       │   ├── controller/ # REST Controllers
│   │       │   ├── dto/        # Data Transfer Objects
│   │       │   └── service/    # Business Logic
│   │       └── resources/
│   │           └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/        # React Components
│   │   │   ├── Header.jsx     # Navigation
│   │   │   ├── Hero.jsx       # Hero Section
│   │   │   ├── Overview.jsx   # Tổng quan
│   │   │   ├── Location.jsx   # Vị trí
│   │   │   ├── Design.jsx     # Thiết kế
│   │   │   ├── FloorPlans.jsx # Mặt bằng
│   │   │   ├── Amenities.jsx  # Tiện ích
│   │   │   ├── Gallery.jsx    # Thư viện ảnh
│   │   │   ├── Contact.jsx    # Form liên hệ
│   │   │   └── Footer.jsx     # Footer
│   │   ├── services/          # API Services
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   └── images/            # Ảnh dự án
│   │       ├── gallery/       # Ảnh gallery
│   │       ├── overview/      # Ảnh tổng quan
│   │       ├── design/        # Ảnh thiết kế
│   │       ├── amenities/     # Ảnh tiện ích
│   │       ├── floorplans/    # Ảnh mặt bằng
│   │       ├── location/      # Ảnh vị trí
│   │       └── hero/          # Ảnh hero
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── docker-compose.yml         # Production
├── docker-compose.dev.yml     # Development
└── README.md
```

## 🚀 Cài đặt & Chạy

### Development

#### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# Mở http://localhost:5173
```

#### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run
# API chạy tại http://localhost:8080
```

### Production với Docker

```bash
# Build và chạy tất cả services
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### Build Production

#### Frontend
```bash
cd frontend
npm run build
# Output: dist/
```

#### Backend
```bash
cd backend
./mvnw clean package -DskipTests
# Output: target/atera-backend.jar
```

## 🔧 Cấu hình

### Environment Variables

#### Backend
- `SPRING_PROFILES_ACTIVE`: dev | prod
- `SERVER_PORT`: Port cho backend (default: 8080)

#### Frontend
- `VITE_API_URL`: URL của backend API (default: http://localhost:8080)

## 📸 Cấu trúc ảnh

Ảnh đã được copy từ folder ATERA PHỐ NỐI:
- `public/images/gallery/` - 33 ảnh gallery (gallery-1 đến gallery-33)
- `public/images/overview/` - 7 ảnh tổng quan
- `public/images/design/` - 5 ảnh thiết kế
- `public/images/amenities/` - 13 ảnh tiện ích
- `public/images/floorplans/` - 3 ảnh mặt bằng
- `public/images/location/` - 2 ảnh vị trí
- `gallery-*.jpg` - Ảnh thư viện

## 🌐 Deploy lên Server

### Option 1: Docker (Recommended)
```bash
# Trên server
git clone <repository>
cd atera-landing-page
docker-compose up -d --build
```

### Option 2: Manual Deploy

#### Backend
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/atera-landing-api-1.0.0.jar
```

#### Frontend
```bash
cd frontend
npm run build
# Copy dist/ to nginx web root
```

## 🛠 Tech Stack

- **Backend**: Spring Boot 3.2, Java 17, Maven
- **Frontend**: React 18, Vite, Tailwind CSS
- **Libraries**: Framer Motion, Swiper, React Hook Form
- **Deployment**: Docker, Nginx

## 📱 Features

- ✅ Responsive design
- ✅ Smooth animations
- ✅ Image gallery with lightbox
- ✅ Contact form with validation
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Docker ready

## 📞 Liên hệ

- Hotline: 0909 888 999
- Email: contact@atera-phonoi.vn
