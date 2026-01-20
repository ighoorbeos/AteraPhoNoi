import axios from 'axios';
import authAxios from '../axios.config';

// Base URL for chat API - uses separate path from main API
const API_BASE = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8080';
const API_URL = `${API_BASE}/api/chat`;

// Get visitor ID from localStorage or generate new one
const getVisitorId = () => {
  let visitorId = localStorage.getItem('chat_visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_visitor_id', visitorId);
  }
  return visitorId;
};

// Create axios instance for visitor (public, no auth required)
const visitorAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Create axios instance for admin (needs auth)
const adminAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add auth token for admin requests
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Visitor endpoints (public - no auth required)
const getOrCreateConversation = async (visitorName, visitorPhone) => {
  const visitorId = getVisitorId();
  const params = new URLSearchParams();
  params.append('visitorId', visitorId);
  if (visitorName) params.append('visitorName', visitorName);
  if (visitorPhone) params.append('visitorPhone', visitorPhone);
  
  return visitorAxios.post(`${API_URL}/visitor/conversation?${params.toString()}`);
};

const sendVisitorMessage = async (content, visitorName, visitorPhone) => {
  const visitorId = getVisitorId();
  return visitorAxios.post(`${API_URL}/visitor/send`, {
    visitorId,
    content,
    visitorName,
    visitorPhone
  });
};

const getVisitorMessages = async () => {
  const visitorId = getVisitorId();
  return visitorAxios.get(`${API_URL}/visitor/messages?visitorId=${visitorId}`);
};

// Admin endpoints (requires auth)
const getAllConversations = async () => {
  return adminAxios.get(`${API_URL}/admin/conversations`);
};

const getConversationById = async (conversationId) => {
  return adminAxios.get(`${API_URL}/admin/conversations/${conversationId}`);
};

const sendAdminMessage = async (conversationId, content, adminName = 'Admin') => {
  return adminAxios.post(`${API_URL}/admin/send/${conversationId}`, {
    content,
    adminName
  });
};

const getUnreadCount = async () => {
  return adminAxios.get(`${API_URL}/admin/unread-count`);
};

const closeConversation = async (conversationId) => {
  return adminAxios.post(`${API_URL}/admin/conversations/${conversationId}/close`);
};

export const chatService = {
  getVisitorId,
  getOrCreateConversation,
  sendVisitorMessage,
  getVisitorMessages,
  getAllConversations,
  getConversationById,
  sendAdminMessage,
  getUnreadCount,
  closeConversation
};

export default chatService;
