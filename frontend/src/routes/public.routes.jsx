// ==========================================
// PUBLIC ROUTES - Routes cho trang public
// ==========================================

import HomePage from '../pages/public/HomePage';
import OverviewPage from '../pages/public/OverviewPage';
import LocationPage from '../pages/public/LocationPage';
import DesignPage from '../pages/public/DesignPage';
import FloorPlansPage from '../pages/public/FloorPlansPage';
import AmenitiesPage from '../pages/public/AmenitiesPage';
import GalleryPage from '../pages/public/GalleryPage';
import ContactPage from '../pages/public/ContactPage';

export const publicRoutes = [
  {
    path: '/home',
    element: HomePage,
    title: 'Trang chủ - ATERA PHỐ NỐI'
  },
  {
    path: '/overview',
    element: OverviewPage,
    title: 'Tổng quan - ATERA PHỐ NỐI'
  },
  {
    path: '/location',
    element: LocationPage,
    title: 'Vị trí - ATERA PHỐ NỐI'
  },
  {
    path: '/design',
    element: DesignPage,
    title: 'Thiết kế - ATERA PHỐ NỐI'
  },
  {
    path: '/floor-plans',
    element: FloorPlansPage,
    title: 'Mặt bằng - ATERA PHỐ NỐI'
  },
  {
    path: '/amenities',
    element: AmenitiesPage,
    title: 'Tiện ích - ATERA PHỐ NỐI'
  },
  {
    path: '/gallery',
    element: GalleryPage,
    title: 'Thư viện ảnh - ATERA PHỐ NỐI'
  },
  {
    path: '/contact',
    element: ContactPage,
    title: 'Liên hệ - ATERA PHỐ NỐI'
  }
];
