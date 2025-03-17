import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaHome, FaBook, FaBell, FaUser, FaFileDownload } from 'react-icons/fa';
import '../styles/PatientDetails.css';

const PatientDetails = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  
  // Mock patient data
  const patientData = {
    id: patientId || '12345678',
    name: 'Joan Doe',
    gender: 'F',
    age: '78',
    profileImage: 'https://randomuser.me/api/portraits/women/67.jpg',
    hospitalName: 'Mater Hospital',
    healthPlan: 'Oxford',
    program: 'Diabetes',
    phoneNumber: '000-0000-0000',
    address: '00, a lane, street, landmark, area',
    primaryDoctor: 'Dr.Jones',
    lastVisit: 'MM/DD/YYYY',
    consultationBrief: 'skin breakouts resulting in ...',
    diagnosis: 'Wound diagnosis',
    treatmentPlan: 'Mention treatment',
    labTests: 'bloodtest_12.02.24.pdf',
    pointsOfCare: 'Diabetic patient'
  };
  
  // Handle capture wound button click
  const handleCaptureWound = () => {
    navigate(`/body-model/${patientId}`);
  };

  return (
    <div className="patient-details-container">
      {/* Back button */}
      <div className="back-header">
        <Link to="/dashboard" className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      {/* Patient profile */}
      <div className="patient-profile">
        <div className="profile-image">
          <img src={patientData.profileImage} alt={patientData.name} />
        </div>
        <div className="profile-info">
          <div className="info-row">
            <div className="info-item">
              <span className="info-label">Gender:</span>
              <span className="info-value">{patientData.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{patientData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">{patientData.age}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Capture wound button */}
      <button 
        className="capture-wound-button"
        onClick={handleCaptureWound}
      >
        <FaCamera />
        <span>Capture Wound Images</span>
      </button>
      
      {/* Patient details */}
      <div className="details-section">
        <div className="details-row">
          <div className="details-label">Hospital Name:</div>
          <div className="details-value">{patientData.hospitalName}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Health plan:</div>
          <div className="details-value">{patientData.healthPlan}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Program:</div>
          <div className="details-value">{patientData.program}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Phone Number:</div>
          <div className="details-value">{patientData.phoneNumber}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Address:</div>
          <div className="details-value">{patientData.address}</div>
        </div>
      </div>
      
      <div className="details-section">
        <div className="details-row">
          <div className="details-label">Primary Doctor:</div>
          <div className="details-value">{patientData.primaryDoctor}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Last visit:</div>
          <div className="details-value">{patientData.lastVisit}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Consultation Brief:</div>
          <div className="details-value">{patientData.consultationBrief}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Diagnosis:</div>
          <div className="details-value">{patientData.diagnosis}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Treatment Plan:</div>
          <div className="details-value">{patientData.treatmentPlan}</div>
        </div>
        <div className="details-row">
          <div className="details-label">Lab tests:</div>
          <div className="details-value download-link">
            <a href="#">{patientData.labTests}</a>
          </div>
        </div>
        <div className="details-row">
          <div className="details-label">Points of Care:</div>
          <div className="details-value">{patientData.pointsOfCare}</div>
        </div>
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
      <div className="bottom-indicator"></div>
    </div>
  );
};

export default PatientDetails; 