// ==========================================
// CONTACT SERVICE - Quản lý tin nhắn liên hệ
// ==========================================

import axios from '../axios.config';

export const contactService = {
  /**
   * Gửi tin nhắn liên hệ từ guest (Public)
   * @param {Object} contactData - Thông tin liên hệ
   * @returns {Promise} Response message
   */
  submitContact: async (contactData) => {
    try {
      const response = await axios.post('/contacts', contactData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error('Bạn đã gửi quá nhiều tin nhắn. Vui lòng thử lại sau.');
      }
      throw error;
    }
  },

  /**
   * Lấy danh sách tất cả contacts (Admin only)
   * @returns {Promise} Danh sách contacts
   */
  getAll: async () => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  /**
   * Lấy chi tiết 1 contact (Admin only)
   * @param {number} id - Contact ID
   * @returns {Promise} Contact detail
   */
  getById: async (id) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  /**
   * Cập nhật trạng thái contact (Admin only)
   * @param {number} id - Contact ID
   * @param {string} status - NEW, CONTACTED, INTERESTED, MEETING_SCHEDULED, CONVERTED, NOT_INTERESTED, SPAM
   * @returns {Promise} Updated contact
   */
  updateStatus: async (id, status) => {
    try {
      const response = await axios.put(`/contacts/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  },

  /**
   * Xóa contact (Admin only)
   * @param {number} id - Contact ID
   * @returns {Promise}
   */
  delete: async (id) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  },

  /**
   * Filter contacts theo status (Admin only)
   * @param {string} status - Status để filter
   * @returns {Promise} Filtered contacts
   */
  filterByStatus: async (status) => {
    try {
      const response = await axios.get(`/contacts?status=${status}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering contacts:', error);
      throw error;
    }
  }
};
