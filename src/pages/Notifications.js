import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaBook, FaBell, FaUser, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import '../styles/Notifications.css';

const Notifications = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Wound Assessment Required',
      message: 'Patient John Doe is due for a follow-up wound assessment',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Patient Added',
      message: 'Sarah Smith has been added to your patient list',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Assessment Completed',
      message: 'Wound assessment for Michael Johnson has been successfully saved',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'Wound Assist app has been updated to version 2.1.0',
      time: '3 days ago',
      read: true
    },
    {
      id: 5,
      type: 'alert',
      title: 'Critical Alert',
      message: 'Patient Robert Brown shows signs of infection in wound #2',
      time: '4 days ago',
      read: true
    }
  ];

  // Function to get icon based on notification type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success':
        return <FaCheckCircle className="notification-icon success" />;
      case 'alert':
        return <FaExclamationCircle className="notification-icon alert" />;
      case 'info':
      default:
        return <FaInfoCircle className="notification-icon info" />;
    }
  };

  return (
    <div className="notifications-container">
      {/* Back button header */}
      <div className="back-header">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      <h1 className="notifications-title">Notifications</h1>
      
      <div className="notification-filters">
        <button className="filter-button active">All</button>
        <button className="filter-button">Unread</button>
        <button className="filter-button">Alerts</button>
        <button className="filter-button">Info</button>
      </div>
      
      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            {getNotificationIcon(notification.type)}
            <div className="notification-content">
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      {notifications.length === 0 && (
        <div className="empty-notifications">
          <FaBell className="empty-icon" />
          <p>No notifications yet</p>
        </div>
      )}
      
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
        <Link to="/notifications" className="nav-item active">
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

export default Notifications; 