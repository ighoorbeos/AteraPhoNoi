// ==========================================
// ADMIN ROUTES - Routes cho admin panel
// ==========================================

import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ChatManagementPage from '../pages/admin/ChatManagementPage';

export const adminRoutes = [
  {
    path: '/admin/login',
    element: LoginPage,
    title: 'Đăng nhập Admin - ATERA',
    isProtected: false
  },
  {
    path: '/admin/dashboard',
    element: DashboardPage,
    title: 'Dashboard - ATERA Admin',
    isProtected: true,
    requiredRoles: ['ADMIN']
  },
  {
    path: '/admin/chat',
    element: ChatManagementPage,
    title: 'Quản lý Chat - ATERA Admin',
    isProtected: true,
    requiredRoles: ['ADMIN']
  }
];
