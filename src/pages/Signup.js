import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHeartbeat, FaUser, FaLock, FaEnvelope, FaIdCard, FaHospital, FaUserMd, FaUserInjured } from 'react-icons/fa';
import '../styles/Signup.css';

const Signup = () => {
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    hospital: '',
    patientId: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log(`Signing up as ${userType} with data:`, formData);
    
    // Navigate to login page after signup
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <div className="logo-icon">
          <FaHeartbeat size={40} color="#0a2463" />
        </div>
        <h1 className="app-title">Wound Assist</h1>
        <p className="app-subtitle">By WellMed</p>
      </div>
      
      <div className="signup-form-container">
        <h2 className="signup-title">
          {userType === 'clinician' ? (
            <>
              <FaUserMd className="title-icon" />
              Clinician Signup
            </>
          ) : (
            <>
              <FaUserInjured className="title-icon" />
              Patient Signup
            </>
          )}
        </h2>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {userType === 'clinician' && (
            <>
              <div className="form-group">
                <div className="input-icon">
                  <FaIdCard />
                </div>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <div className="input-icon">
                  <FaHospital />
                </div>
                <input
                  type="text"
                  name="hospital"
                  placeholder="Hospital/Clinic"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          {userType === 'patient' && (
            <div className="form-group">
              <div className="input-icon">
                <FaIdCard />
              </div>
              <input
                type="text"
                name="patientId"
                placeholder="Patient ID (if provided by your doctor)"
                value={formData.patientId}
                onChange={handleChange}
              />
            </div>
          )}
          
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        
        <div className="login-option">
          Already have an account?{' '}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 