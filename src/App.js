import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import WoundAssessment from './pages/WoundAssessment';
import BodyModel from './pages/BodyModel';
import BodyPartCapture from './pages/BodyPartCapture';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import PatientDetails from './pages/PatientDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Learn from './pages/Learn';
import BottomNavigation from './components/BottomNavigation';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Help from './pages/Help';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding" />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/:userType" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient/:patientId" element={<PatientDetails />} />
          <Route path="/body-model/:patientId" element={<BodyModel />} />
          <Route path="/body-part-capture/:patientId/:bodyPartId" element={<BodyPartCapture />} />
          <Route path="/wound-assessment/:patientId" element={<WoundAssessment />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App; 