/**
 * Protected Route Component
 * MongoDB Backend Authentication
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated
      if (!user) {
        if (requireAdmin) {
          navigate('/admin-login');
        } else {
          navigate('/auth');
        }
        return;
      }

      // For admin routes, verify admin role
      if (requireAdmin && !isAdmin) {
        navigate('/admin-login');
      }
    }
  }, [user, loading, isAdmin, requireAdmin, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // For admin routes, user must have admin role
  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};
