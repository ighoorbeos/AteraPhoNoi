import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { publicRoutes, adminRoutes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import ChatBox from './components/ChatBox';

// Component to conditionally render ChatBox
function ChatBoxWrapper() {
  const location = useLocation();
  // Don't show ChatBox on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return <ChatBox />;
}

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
        
        {/* ChatBox for visitors - only on public pages */}
        <ChatBoxWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App
