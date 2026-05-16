/**
 * Ruta protegida: solo usuarios con rol admin.
 * @module components/AdminRoute
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdmin } from '../utils/auth';

/**
 * @param {{ children: React.ReactNode }} props
 */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?redirect=/auditoria" replace />;
  }

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
