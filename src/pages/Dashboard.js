import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookmark, FaChevronRight, FaHome, FaBook, FaBell, FaUser, FaArrowRight } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: 'Tracy',
    date: '28th March 2024, Thursday',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  };

  // Mock recent searches
  const recentSearches = [
    { id: 1, name: 'Joan Doe', memberId: '12345678', dob: '01/01/1970' },
    { id: 2, name: 'Joan Doe', memberId: '12345678', dob: '01/01/1970' },
    { id: 3, name: 'Joan Doe', memberId: '12345678', dob: '01/01/1970' }
  ];

  // Mock quick finds with exact data from the image
  const quickFinds = [
    { 
      id: 1, 
      title: 'How to treat a diabetic foot wound ?', 
      image: 'https://via.placeholder.com/60x60',
      date: 'Jul 10, 2023',
      time: '5min read'
    },
    { 
      id: 2, 
      title: 'Do\'s & Don\'ts for diabetic ulcer wound', 
      image: 'https://via.placeholder.com/60x60',
      date: 'Jul 10, 2023',
      time: '5min read'
    },
    { 
      id: 3, 
      title: 'Easy tips for wound assist', 
      image: 'https://via.placeholder.com/60x60',
      date: 'Jul 10, 2023',
      time: '5min read'
    }
  ];

  // New tips and tricks section
  const tipsAndTricks = [
    "Keep wounds clean and dry.",
    "Monitor for signs of infection.",
    "Ensure proper nutrition for healing."
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome back, {userData.name}!</h1>
        <p>Today is {userData.date}</p>
      </div>

      {/* Header with user info */}
      <div className="dashboard-header">
        <div className="user-info">
          <p className="date">{userData.date}</p>
          <h2 className="welcome">Welcome {userData.name}!</h2>
        </div>
        <div className="profile-image">
          <img src={userData.profileImage} alt="Profile" />
        </div>
      </div>

      {/* Enhanced Search bar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search by Member Name, Date, or ID" 
        />
        <select className="search-filter">
          <option value="all">All</option>
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="date">Date</option>
        </select>
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      {/* Recent searches section */}
      <div className="section-header">
        <h3>Recent Searches</h3>
        <Link to="/all-searches" className="see-all-link">See all</Link>
      </div>
      <div className="recent-searches">
        {recentSearches.map((search, index) => (
          <div key={search.id} className={`recent-search-item ${index === 0 ? 'active' : ''}`}>
            <div className="search-info">
              <p className="search-label">Name / Member Id / DOB</p>
              <p className="search-value">{search.name} {search.memberId}, {search.dob}</p>
            </div>
            <Link to={`/patient/${search.id}`} className={`action-button ${index === 0 ? 'blue' : index === 2 ? 'orange' : ''}`}>
              {index === 0 ? (
                <FaChevronRight />
              ) : index === 2 ? (
                <FaArrowRight />
              ) : (
                <FaChevronRight />
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Quick finds section */}
      <div className="section-header">
        <h3>Quick Finds</h3>
        <Link to="/all-quick-finds" className="see-all-link">See all</Link>
      </div>
      <div className="quick-finds">
        {quickFinds.map((item) => (
          <div key={item.id} className="quick-find-item">
            <div className="quick-find-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="quick-find-details">
              <h3>{item.title}</h3>
              <p className="quick-find-meta">{item.date} • {item.time}</p>
            </div>
            <button className="bookmark-button">
              <FaBookmark />
            </button>
          </div>
        ))}
      </div>

      {/* Tips & Tricks Section */}
      <div className="tips-tricks">
        <h3>Tips & Tricks</h3>
        <ul>
          {tipsAndTricks.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Bottom navigation */}
      <div className="bottom-navigation">
        <Link to="/dashboard" className="nav-item active">
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
        <Link to="/profile" className="nav-item">
          <FaUser />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 