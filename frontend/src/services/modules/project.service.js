// ==========================================
// PROJECT SERVICE - Quản lý thông tin dự án
// ==========================================

import axios from '../axios.config';

export const projectService = {
  /**
   * Lấy thông tin dự án đầy đủ
   * @returns {Promise} Project data với product types, amenities, gallery
   */
  getProjectInfo: async () => {
    try {
      const response = await axios.get('/public/project');
      return response.data;
    } catch (error) {
      console.error('Error fetching project info:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách product types
   * @returns {Promise} Danh sách loại sản phẩm
   */
  getProductTypes: async () => {
    try {
      const response = await axios.get('/public/project/product-types');
      return response.data;
    } catch (error) {
      console.error('Error fetching product types:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách amenities
   * @returns {Promise} Danh sách tiện ích
   */
  getAmenities: async () => {
    try {
      const response = await axios.get('/public/project/amenities');
      return response.data;
    } catch (error) {
      console.error('Error fetching amenities:', error);
      throw error;
    }
  },

  /**
   * Lấy danh sách hình ảnh gallery
   * @param {string} category - Optional: EXTERIOR, INTERIOR, AMENITY, FLOORPLAN, LOCATION, DESIGN
   * @returns {Promise} Danh sách hình ảnh
   */
  getGalleryImages: async (category = null) => {
    try {
      const url = category 
        ? `/public/project/gallery?category=${category}`
        : '/public/project/gallery';
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  }
};
