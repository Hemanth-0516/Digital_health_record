import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LandingPage from '../components/pages/LandingPage';
import LoginPage from '../components/auth/LoginPage';
import Dashboard from '../components/dashboard/Dashboard';
import MigrantRegistration from '../components/migrant/MigrantRegistration';
import MigrantProfile from '../components/migrant/MigrantProfile';
import HealthRecords from '../components/health/HealthRecords';
import ClinicPortal from '../components/clinic/ClinicPortal';
import AdminPortal from '../components/admin/AdminPortal';
import EmployerPortal from '../components/employer/EmployerPortal';
import ConsentManagement from '../components/consent/ConsentManagement';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/register-migrant" 
        element={user ? <MigrantRegistration /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/migrant/:id" 
        element={user ? <MigrantProfile /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/health-records/:id?" 
        element={user ? <HealthRecords /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/clinic" 
        element={user?.role === 'clinician' ? <ClinicPortal /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/admin" 
        element={user?.role === 'admin' ? <AdminPortal /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/employer" 
        element={user?.role === 'employer' ? <EmployerPortal /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/consent" 
        element={user ? <ConsentManagement /> : <Navigate to="/login" />} 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;