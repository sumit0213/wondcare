import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaBell, FaUser } from 'react-icons/fa';
import '../styles/BottomNavigation.css';

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <>
      <div className="bottom-navigation">
        <Link to="/dashboard" className={`nav-item ${path === '/dashboard' || path === '/' ? 'active' : ''}`}>
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/learn" className={`nav-item ${path === '/learn' ? 'active' : ''}`}>
          <FaBook />
          <span>Learn</span>
        </Link>
        <Link to="/notifications" className={`nav-item ${path === '/notifications' ? 'active' : ''}`}>
          <FaBell />
          <span>Notification</span>
        </Link>
        <Link to="/profile" className={`nav-item ${path === '/profile' ? 'active' : ''}`}>
          <FaUser />
          <span>Profile</span>
        </Link>
      </div>
      <div className="bottom-indicator"></div>
    </>
  );
};

export default BottomNavigation; 