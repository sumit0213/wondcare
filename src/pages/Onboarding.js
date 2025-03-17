import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Onboarding.css';
import { FaHeartbeat, FaCamera, FaBookMedical, FaHandshake } from 'react-icons/fa';

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  // Define the screens with content matching the image
  const screens = [
    {
      title: "Wound Assist",
      subtitle: "By WellMed",
      icon: <FaHeartbeat size={60} color="#0a2463" />,
      showSkip: true
    },
    {
      title: "Capture wound image to get AI generated results",
      icon: <FaCamera size={60} color="#0a2463" />,
      showSkip: true
    },
    {
      title: "Learn more about wound & educate patients",
      icon: <FaBookMedical size={60} color="#0a2463" />,
      showSkip: true
    },
    {
      title: "Enhanced experience for self & patients",
      icon: <FaHandshake size={60} color="#0a2463" />,
      showSkip: false,
      showGetStarted: true
    }
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to login page when onboarding is complete
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const renderDots = () => {
    return (
      <div className="dots-container">
        {screens.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === currentScreen ? 'active' : ''}`}
            onClick={() => setCurrentScreen(index)}
          />
        ))}
      </div>
    );
  };

  const currentScreenData = screens[currentScreen];

  return (
    <div className="onboarding-container">
      {/* Left side content */}
      <div className="onboarding-left">
        {currentScreen === 0 ? (
          <div className="logo-container">
            <div className="logo-icon">
              {currentScreenData.icon}
            </div>
            <h1 className="app-title">{currentScreenData.title}</h1>
            <p className="app-subtitle">{currentScreenData.subtitle}</p>
          </div>
        ) : null}
      </div>
      
      {/* Center content with illustration */}
      <div className="onboarding-center">
        {currentScreen > 0 && (
          <div className="illustration-container">
            <div className="illustration-circle">
              {/* This would be the doctor or notes illustration */}
              {currentScreenData.icon}
            </div>
            <h2 className="feature-title">{currentScreenData.title}</h2>
            {renderDots()}
          </div>
        )}
      </div>
      
      {/* Right side content */}
      <div className="onboarding-right">
        {/* Empty on first screen */}
      </div>
      
      {/* Bottom navigation */}
      <div className="onboarding-actions">
        {currentScreenData.showSkip && (
          <button className="skip-button" onClick={handleSkip}>Skip</button>
        )}
        
        {currentScreenData.showGetStarted ? (
          <button className="get-started-button" onClick={handleGetStarted}>
            Get Started <span className="arrow">→</span>
          </button>
        ) : (
          <button className="next-button" onClick={handleNext}>
            Next <span className="arrow">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding; 