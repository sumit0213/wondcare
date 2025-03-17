import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaBook, FaBell, FaUser, FaUserEdit, FaSignOutAlt, FaCog, FaQuestionCircle } from 'react-icons/fa';
import '../styles/Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Back button header */}
      <div className="back-header">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      <div className="profile-header">
        <div className="profile-avatar">
          <img src="/images/doctor-avatar.jpg" alt="Profile" />
        </div>
        <h1 className="profile-name">Dr. Sarah Johnson</h1>
        <p className="profile-role">Wound Care Specialist</p>
        <p className="profile-hospital">City General Hospital</p>
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
        
        <Link to="/login" className="profile-action-button logout">
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </div>
      
      <div className="profile-stats">
        <h2 className="section-title">Your Activity</h2>
        
        <div className="stat-card">
          <div className="stat-value">128</div>
          <div className="stat-label">Patients Assessed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">342</div>
          <div className="stat-label">Wound Assessments</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">87%</div>
          <div className="stat-label">Healing Rate</div>
        </div>
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