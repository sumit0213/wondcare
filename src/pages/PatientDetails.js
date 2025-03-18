import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaHome, FaBook, FaBell, FaUser, FaFileDownload, FaVenusMars, FaBirthdayCake, FaStethoscope, FaCalendarAlt, FaFileMedical, FaDiagnoses, FaPrescription, FaVial, FaProcedures, FaHospital, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
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
    pointsOfCare: 'Diabetic patient',
    medicalHistory: 'Patient has a history of diabetes and hypertension.',
    previousWoundHistory: 'Treated for a foot ulcer in 2022.',
    numberOfVisits: '5 visits in the last year.',
    otherInfo: 'Patient is allergic to penicillin.',
    woundDetails: {
      type: 'Venous Ulcer',
      severity: 'Mild',
      size: '4.2 cm x 0.5 cm',
      color: 'Red-Yellow',
      healingStage: 'Stalled',
      riskFactors: ['Malnutrition', 'Infection'],
      treatmentRecommendation: 'Clean with antiseptic solution and apply foam dressing',
      careRecommendations: ['Monitor for signs of infection', 'Change dressing every 48 hours']
    }
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
      <div className="patient-profile card">
        <div className="profile-image">
          <img src={patientData.profileImage} alt={patientData.name} />
        </div>
        <div className="profile-info">
          <div className="info-row">
            <div className="info-item">
              <FaUser className="info-icon" />
              <span className="info-label">Name:</span>
              <span className="info-value">{patientData.name}</span>
            </div>
            <div className="info-item">
              <FaVenusMars className="info-icon" />
              <span className="info-label">Gender:</span>
              <span className="info-value">{patientData.gender}</span>
            </div>
            <div className="info-item">
              <FaBirthdayCake className="info-icon" />
              <span className="info-label">Age:</span>
              <span className="info-value">{patientData.age}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Capture wound button */}
      <div className="capture-button-container">
        <button 
          className="capture-wound-button modern-button"
          onClick={handleCaptureWound}
        >
          <FaCamera />
          <span>Capture Wound Images</span>
        </button>
      </div>
      
      {/* Patient details */}
      <div className="details-section card">
        <div className="details-row">
          <FaStethoscope className="details-icon" />
          <div className="details-label">Primary Doctor:</div>
          <div className="details-value">{patientData.primaryDoctor}</div>
        </div>
        <div className="details-row">
          <FaCalendarAlt className="details-icon" />
          <div className="details-label">Last visit:</div>
          <div className="details-value">{patientData.lastVisit}</div>
        </div>
        <div className="details-row">
          <FaFileMedical className="details-icon" />
          <div className="details-label">Consultation Brief:</div>
          <div className="details-value">{patientData.consultationBrief}</div>
        </div>
        <div className="details-row">
          <FaDiagnoses className="details-icon" />
          <div className="details-label">Diagnosis:</div>
          <div className="details-value">{patientData.diagnosis}</div>
        </div>
        <div className="details-row">
          <FaPrescription className="details-icon" />
          <div className="details-label">Treatment Plan:</div>
          <div className="details-value">{patientData.treatmentPlan}</div>
        </div>
        <div className="details-row">
          <FaVial className="details-icon" />
          <div className="details-label">Lab tests:</div>
          <div className="details-value download-link">
            <a href="#">{patientData.labTests}</a>
          </div>
        </div>
        <div className="details-row">
          <FaProcedures className="details-icon" />
          <div className="details-label">Points of Care:</div>
          <div className="details-value">{patientData.pointsOfCare}</div>
        </div>
        <div className="details-row">
          <FaHospital className="details-icon" />
          <div className="details-label">Hospital Name:</div>
          <div className="details-value">{patientData.hospitalName}</div>
        </div>
        <div className="details-row">
          <FaFileMedical className="details-icon" />
          <div className="details-label">Health Plan:</div>
          <div className="details-value">{patientData.healthPlan}</div>
        </div>
        <div className="details-row">
          <FaPhone className="details-icon" />
          <div className="details-label">Phone Number:</div>
          <div className="details-value">{patientData.phoneNumber}</div>
        </div>
        <div className="details-row">
          <FaMapMarkerAlt className="details-icon" />
          <div className="details-label">Address:</div>
          <div className="details-value">{patientData.address}</div>
        </div>
      </div>
      
      {/* Additional Patient Information */}
      <div className="additional-info card">
        <h3>Medical History</h3>
        <p>{patientData.medicalHistory || "No medical history available."}</p>
        
        <h3>Previous Wound History</h3>
        <p>{patientData.previousWoundHistory || "No previous wound history available."}</p>
        
        <h3>Number of Visits</h3>
        <p>{patientData.numberOfVisits || "No visit data available."}</p>
        
        <h3>Other Important Information</h3>
        <p>{patientData.otherInfo || "No additional information available."}</p>
      </div>
      
      {/* Wound Analysis Results
      <div className="wound-analysis card">
        <h2>Wound Analysis Results</h2>
        <div className="wound-image">
          <img src="https://via.placeholder.com/150" alt="Wound" />
        </div>
        <div className="wound-details">
          <div className="details-row">
            <span className="details-label">Wound Type:</span>
            <span className="details-value">{patientData.woundDetails.type}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Severity:</span>
            <span className="details-value">{patientData.woundDetails.severity}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Size:</span>
            <span className="details-value">{patientData.woundDetails.size}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Color:</span>
            <span className="details-value">{patientData.woundDetails.color}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Healing Stage:</span>
            <span className="details-value">{patientData.woundDetails.healingStage}</span>
          </div>
        </div>
        <div className="additional-info">
          <h3>Risk Factors</h3>
          <ul>
            {patientData.woundDetails.riskFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
          <h3>Treatment Recommendation</h3>
          <p>{patientData.woundDetails.treatmentRecommendation}</p>
          <h3>Care Recommendations</h3>
          <ul>
            {patientData.woundDetails.careRecommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      </div> */}
      
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