// ==========================================
// AUTH SERVICE - Quản lý authentication
// ==========================================

import axios from '../axios.config';

export const authService = {
  /**
   * Đăng nhập admin
   * @param {string} username - Tên đăng nhập
   * @param {string} password - Mật khẩu
   * @returns {Promise} Response với token và user info
   */
  login: async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      
      // Backend trả về: { success: true, message: "...", data: { accessToken, user, ... } }
      const { data } = response.data;
      
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Đăng xuất
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Lấy thông tin user hiện tại
   * @returns {Object|null} User object hoặc null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  },

  /**
   * Kiểm tra đã đăng nhập chưa
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
