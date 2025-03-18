import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, FaHome, FaBook, FaBell, FaUser, 
  FaUserEdit, FaSignOutAlt, FaCog, FaQuestionCircle, 
  FaUserMd, FaUserInjured, FaHospital, FaPhone, FaEnvelope
} from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('clinician');
  const navigate = useNavigate();
  
  // Mock profile data
  const clinicianProfile = {
    name: 'Dr. Sarah Johnson',
    role: 'Wound Care Specialist',
    hospital: 'City General Hospital',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 123-4567',
    profileImage: '/images/doctor-avatar.jpg',
    stats: [
      { value: '128', label: 'Patients Assessed' },
      { value: '342', label: 'Wound Assessments' },
      { value: '87%', label: 'Healing Rate' }
    ]
  };
  
  const patientProfile = {
    name: 'John Smith',
    age: '65',
    condition: 'Diabetic Foot Ulcer',
    hospital: 'City General Hospital',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    profileImage: '/images/patient-avatar.jpg',
    stats: [
      { value: '12', label: 'Assessments' },
      { value: '8', label: 'Weeks in Treatment' },
      { value: '65%', label: 'Healing Progress' }
    ]
  };
  
  const currentProfile = activeTab === 'clinician' ? clinicianProfile : patientProfile;
  
  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    navigate('/login');
  };

  return (
    <div className="profile-container">
      {/* Back button header */}
      <div className="back-header">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      {/* Profile type tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'clinician' ? 'active' : ''}`}
          onClick={() => setActiveTab('clinician')}
        >
          <FaUserMd />
          <span>Clinician</span>
        </button>
        <button 
          className={`tab-button ${activeTab === 'patient' ? 'active' : ''}`}
          onClick={() => setActiveTab('patient')}
        >
          <FaUserInjured />
          <span>Patient</span>
        </button>
      </div>
      
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={currentProfile.profileImage} alt="Profile" />
        </div>
        <h1 className="profile-name">{currentProfile.name}</h1>
        <p className="profile-role">{activeTab === 'clinician' ? currentProfile.role : `Age: ${currentProfile.age}`}</p>
        <p className="profile-hospital">
          {activeTab === 'clinician' ? currentProfile.hospital : currentProfile.condition}
        </p>
      </div>
      
      <div className="profile-contact-info">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>{currentProfile.email}</span>
        </div>
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span>{currentProfile.phone}</span>
        </div>
        {activeTab === 'clinician' && (
          <div className="contact-item">
            <FaHospital className="contact-icon" />
            <span>{currentProfile.hospital}</span>
          </div>
        )}
      </div>
      
      <div className="profile-actions">
        <Link to="/edit-profile" className="profile-action-button">
          <FaUserEdit />
          <span>Edit Profile</span>
        </Link>
        
        <Link to="/settings" className="profile-action-button">
          <FaCog />
          <span>Settings</span>
        </Link>
        
        <Link to="/help" className="profile-action-button">
          <FaQuestionCircle />
          <span>Help & Support</span>
        </Link>
        
        <button className="profile-action-button logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="profile-stats">
        <h2 className="section-title">Your Activity</h2>
        
        {currentProfile.stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Bottom navigation */}
      <div className="bottom-navigation">
        <Link to="/dashboard" className="nav-item">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/learn" className="nav-item">
          <FaBook />
          <span>Learn</span>
        </Link>
        <Link to="/notifications" className="nav-item">
          <FaBell />
          <span>Notification</span>
        </Link>
        <Link to="/profile" className="nav-item active">
          <FaUser />
          <span>Profile</span>
        </Link>
      </div>
      <div className="bottom-indicator"></div>
    </div>
  );
};

export default Profile; 