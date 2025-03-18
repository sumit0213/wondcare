import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaHome, FaBook, FaBell, FaUser, 
  FaQuestionCircle, FaEnvelope, FaPhone, FaComments,
  FaChevronDown, FaChevronUp, FaSearch
} from 'react-icons/fa';
import '../styles/Help.css';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I capture a wound image?",
      answer: "To capture a wound image, navigate to the patient details page, click on 'Capture Wound Images', select the body part with the wound on the body model, and then use your device's camera to take a clear picture of the wound."
    },
    {
      id: 2,
      question: "How accurate is the AI wound analysis?",
      answer: "Our AI wound analysis has been trained on thousands of wound images and has an accuracy rate of over 90%. However, it should be used as a supportive tool for clinical decision-making, not as a replacement for professional medical judgment."
    },
    {
      id: 3,
      question: "Can I edit a wound assessment after saving it?",
      answer: "Yes, you can edit a wound assessment after saving it. Navigate to the patient's record, find the assessment you want to edit, and click on the 'Edit' button. Make your changes and save again."
    },
    {
      id: 4,
      question: "How do I add a new patient to the system?",
      answer: "To add a new patient, go to the Dashboard, click on 'Patients' in the navigation menu, then click the 'Add New Patient' button. Fill in the required information and click 'Save'."
    },
    {
      id: 5,
      question: "Is my patient data secure?",
      answer: "Yes, all patient data is encrypted and stored securely in compliance with HIPAA regulations. We use industry-standard security protocols to protect your data."
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="help-container">
      {/* Back button header */}
      <div className="back-header">
        <Link to="/profile" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      <h1 className="help-title">Help & Support</h1>
      
      {/* Search bar */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      {/* FAQs section */}
      <div className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => (
            <div className="faq-item" key={faq.id}>
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(faq.id)}
              >
                <FaQuestionCircle className="question-icon" />
                <span>{faq.question}</span>
                {expandedFaq === faq.id ? 
                  <FaChevronUp className="chevron-icon" /> : 
                  <FaChevronDown className="chevron-icon" />
                }
              </div>
              {expandedFaq === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {/* Contact section */}
      <div className="contact-section">
        <h2 className="section-title">Contact Support</h2>
        
        <div className="contact-card">
          <div className="contact-method">
            <FaEnvelope className="contact-icon" />
            <div className="contact-details">
              <h3>Email Support</h3>
              <p>support@woundassist.com</p>
              <p className="response-time">Response time: Within 24 hours</p>
            </div>
          </div>
        </div>
        
        <div className="contact-card">
          <div className="contact-method">
            <FaPhone className="contact-icon" />
            <div className="contact-details">
              <h3>Phone Support</h3>
              <p>1-800-WOUND-HELP</p>
              <p className="response-time">Available: Mon-Fri, 9am-5pm EST</p>
            </div>
          </div>
        </div>
        
        <div className="contact-card">
          <div className="contact-method">
            <FaComments className="contact-icon" />
            <div className="contact-details">
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <button className="chat-button">Start Chat</button>
            </div>
          </div>
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

export default Help;
