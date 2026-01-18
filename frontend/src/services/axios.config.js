// ==========================================
// AXIOS CONFIG - Cấu hình axios instance
// ==========================================

import axios from 'axios';

// Tạo axios instance với base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Thêm token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server trả về lỗi
      switch (error.response.status) {
        case 401:
          // Unauthorized - Xóa token và redirect đến login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (window.location.pathname.startsWith('/admin') && 
              window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
          break;
        case 403:
          console.error('Forbidden: Bạn không có quyền truy cập');
          break;
        case 404:
          console.error('Not Found: Không tìm thấy tài nguyên');
          break;
        case 429:
          console.error('Too Many Requests: Quá nhiều yêu cầu');
          break;
        case 500:
          console.error('Server Error: Lỗi máy chủ');
          break;
        default:
          console.error('Error:', error.response.data?.message || 'Đã xảy ra lỗi');
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error('Network Error: Không thể kết nối đến máy chủ');
    } else {
      // Lỗi khác
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
