import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { publicRoutes, adminRoutes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Public Routes */}
          {publicRoutes.map((route) => (
            <Route 
              key={route.path}
              path={route.path} 
              element={<route.element />} 
            />
          ))}
          
          {/* Admin Routes */}
          {adminRoutes.map((route) => (
            <Route 
              key={route.path}
              path={route.path} 
              element={
                route.isProtected ? (
                  <ProtectedRoute requiredRoles={route.requiredRoles}>
                    <route.element />
                  </ProtectedRoute>
                ) : (
                  <route.element />
                )
              } 
            />
          ))}
          
          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
