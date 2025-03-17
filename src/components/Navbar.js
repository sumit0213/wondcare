import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

// Import icons (you'll need to install an icon library like react-icons)
import { FaHome, FaUsers, FaCamera, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile top navbar */}
      <div className="mobile-top-navbar">
        <div className="app-logo">Wound Assist</div>
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile side menu (shows when menu is toggled) */}
      <div className={`mobile-side-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-items">
          <Link 
            to="/" 
            className={`mobile-menu-item ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <FaHome /> <span>Dashboard</span>
          </Link>
          <Link 
            to="/patients" 
            className={`mobile-menu-item ${isActive('/patients') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <FaUsers /> <span>Patients</span>
          </Link>
          <Link 
            to="/wound-assessment" 
            className={`mobile-menu-item ${isActive('/wound-assessment') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <FaCamera /> <span>Wound Assessment</span>
          </Link>
          <Link 
            to="/reports" 
            className={`mobile-menu-item ${isActive('/reports') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <FaChartBar /> <span>Reports</span>
          </Link>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <div className="mobile-bottom-navbar">
        <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
          <FaHome />
          <span>Home</span>
        </Link>
        <Link to="/patients" className={`bottom-nav-item ${isActive('/patients') ? 'active' : ''}`}>
          <FaUsers />
          <span>Patients</span>
        </Link>
        <Link to="/wound-assessment" className={`bottom-nav-item ${isActive('/wound-assessment') ? 'active' : ''}`}>
          <FaCamera />
          <span>Assess</span>
        </Link>
        <Link to="/reports" className={`bottom-nav-item ${isActive('/reports') ? 'active' : ''}`}>
          <FaChartBar />
          <span>Reports</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar; 