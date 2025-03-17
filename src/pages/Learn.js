import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaBook, FaBell, FaUser, FaInfoCircle, FaCamera, FaUserInjured, FaChartLine } from 'react-icons/fa';
import '../styles/Learn.css';

const Learn = () => {
  return (
    <div className="learn-container">
      {/* Back button header */}
      <div className="back-header">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      <h1 className="learn-title">How to Use Wound Assist</h1>
      
      <div className="instruction-card">
        <div className="instruction-icon">
          <FaHome />
        </div>
        <div className="instruction-content">
          <h3>Dashboard</h3>
          <p>Start here to see your recent patients and quick access to common functions.</p>
        </div>
      </div>
      
      <div className="instruction-card">
        <div className="instruction-icon">
          <FaUserInjured />
        </div>
        <div className="instruction-content">
          <h3>Patient Details</h3>
          <p>View complete patient information and medical history.</p>
        </div>
      </div>
      
      <div className="instruction-card">
        <div className="instruction-icon">
          <FaCamera />
        </div>
        <div className="instruction-content">
          <h3>Wound Assessment</h3>
          <p>Follow these steps to assess a wound:</p>
          <ol className="steps-list">
            <li>Click "Capture Wound Images" on the patient details page</li>
            <li>Select the body parts with wounds on the body model</li>
            <li>Capture clear images of each wound</li>
            <li>Review the AI analysis results</li>
            <li>Save the assessment to the patient record</li>
          </ol>
        </div>
      </div>
      
      <div className="instruction-card">
        <div className="instruction-icon">
          <FaChartLine />
        </div>
        <div className="instruction-content">
          <h3>Tracking Progress</h3>
          <p>Monitor wound healing over time with comparative analysis and trend reports.</p>
        </div>
      </div>
      
      <div className="instruction-card">
        <div className="instruction-icon">
          <FaInfoCircle />
        </div>
        <div className="instruction-content">
          <h3>Need Help?</h3>
          <p>Contact support at support@woundassist.com or call our helpline at 1-800-WOUND-HELP.</p>
        </div>
      </div>
      
      {/* Bottom navigation */}
      <div className="bottom-navigation">
        <Link to="/dashboard" className="nav-item">
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/learn" className="nav-item active">
          <FaBook />
          <span>Learn</span>
        </Link>
        <Link to="/notifications" className="nav-item">
          <FaBell />
          <span>Notification</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <FaUser />
          <span>Profile</span>
        </Link>
      </div>
      <div className="bottom-indicator"></div>
    </div>
  );
};

export default Learn; 