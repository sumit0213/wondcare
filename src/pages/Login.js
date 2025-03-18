import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaUser, FaLock, FaUserMd, FaUserInjured } from 'react-icons/fa';
import '../styles/Login.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('clinician');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    console.log(`Logging in as ${activeTab} with email: ${email}`);
    
    // For demo purposes, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo-icon">
          <FaHeartbeat size={40} color="#0a2463" />
        </div>
        <h1 className="app-title">Wound Assist</h1>
        <p className="app-subtitle">By WellMed</p>
      </div>
      
      <div className="login-tabs">
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
      
      <div className="login-form-container">
        <h2 className="login-title">
          {activeTab === 'clinician' ? 'Clinician Login' : 'Patient Login'}
        </h2>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <div className="login-options">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          
          <div className="signup-option">
            Don't have an account?{' '}
            <Link to={`/signup/${activeTab}`} className="signup-link">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 