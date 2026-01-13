import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { DashboardPage } from '../pages/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
