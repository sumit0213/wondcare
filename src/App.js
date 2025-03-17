import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import WoundAssessment from './pages/WoundAssessment';
import BodyModel from './pages/BodyModel';
import BodyPartCapture from './pages/BodyPartCapture';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import PatientDetails from './pages/PatientDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Learn from './pages/Learn';
import BottomNavigation from './components/BottomNavigation';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import './styles/App.css';

function App() {
  // Function to get current time in 24-hour format
  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  };

  return (
    <BrowserRouter>
      <div className="app">
        <div className="mobile-container">
          {/* Status bar */}
          <div className="status-bar">
            <span className="status-bar-time">{getCurrentTime()}</span>
            <div className="status-bar-icons">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>
          
          {/* Mobile content */}
          <div className="mobile-content">
            <Routes>
              {/* Public routes */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              
              {/* Redirect root to onboarding */}
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/patients" element={
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>
              } />
              <Route path="/patient/:patientId" element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              } />
              <Route path="/wound-assessment/:patientId" element={
                <ProtectedRoute>
                  <WoundAssessment />
                </ProtectedRoute>
              } />
              <Route path="/body-model/:patientId" element={
                <ProtectedRoute>
                  <BodyModel />
                </ProtectedRoute>
              } />
              <Route path="/body-part-capture/:patientId/:bodyPartId" element={
                <ProtectedRoute>
                  <BodyPartCapture />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <BottomNavigation />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 