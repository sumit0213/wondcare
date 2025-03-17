import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaArrowLeft, FaHome, FaBook, FaBell, FaUser, 
  FaHeadSideMask, FaUserInjured, FaChild, FaRunning,
  FaHandPaper, FaWalking, FaShoePrints, FaCamera
} from 'react-icons/fa';
import { 
  GiNeckBite, GiChestArmor, GiAbdominalArmor, 
  GiArmSling, GiLeg, GiBackPain
} from 'react-icons/gi';
import { MdOutlineFrontHand } from 'react-icons/md';
import '../styles/BodyModel.css';

const BodyModel = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedWounds, setSelectedWounds] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeView, setActiveView] = useState('front'); // 'front', 'back'
  const [step, setStep] = useState('select'); // 'select', 'capture'
  const [currentBodyPartIndex, setCurrentBodyPartIndex] = useState(0);
  
  // Load state from location if returning from capture
  useEffect(() => {
    if (location.state) {
      if (location.state.selectedWounds) {
        setSelectedWounds(location.state.selectedWounds);
      }
      if (location.state.returnFromCapture) {
        setStep('capture');
      }
    }
  }, [location]);
  
  // Body parts data with icons
  const bodyParts = {
    front: [
      { id: 'head', name: 'Head', icon: <FaHeadSideMask size={40} /> },
      { id: 'neck', name: 'Neck', icon: <GiNeckBite size={40} /> },
      { id: 'chest', name: 'Chest', icon: <GiChestArmor size={40} /> },
      { id: 'abdomen', name: 'Abdomen', icon: <GiAbdominalArmor size={40} /> },
      { id: 'leftArm', name: 'Left Arm', icon: <GiArmSling size={40} /> },
      { id: 'rightArm', name: 'Right Arm', icon: <GiArmSling size={40} style={{ transform: 'scaleX(-1)' }} /> },
      { id: 'leftHand', name: 'Left Hand', icon: <MdOutlineFrontHand size={40} /> },
      { id: 'rightHand', name: 'Right Hand', icon: <MdOutlineFrontHand size={40} style={{ transform: 'scaleX(-1)' }} /> },
      { id: 'leftLeg', name: 'Left Leg', icon: <GiLeg size={40} /> },
      { id: 'rightLeg', name: 'Right Leg', icon: <GiLeg size={40} style={{ transform: 'scaleX(-1)' }} /> },
      { id: 'leftFoot', name: 'Left Foot', icon: <FaShoePrints size={40} /> },
      { id: 'rightFoot', name: 'Right Foot', icon: <FaShoePrints size={40} style={{ transform: 'scaleX(-1)' }} /> },
    ],
    back: [
      { id: 'backHead', name: 'Back of Head', icon: <FaHeadSideMask size={40} style={{ transform: 'scaleX(-1)' }} /> },
      { id: 'backNeck', name: 'Back of Neck', icon: <GiNeckBite size={40} style={{ transform: 'scaleX(-1)' }} /> },
      { id: 'upperBack', name: 'Upper Back', icon: <GiBackPain size={40} /> },
      { id: 'lowerBack', name: 'Lower Back', icon: <GiBackPain size={40} style={{ transform: 'scaleY(-1)' }} /> },
      { id: 'backLeftArm', name: 'Left Arm (Back)', icon: <GiArmSling size={40} style={{ transform: 'scaleY(-1)' }} /> },
      { id: 'backRightArm', name: 'Right Arm (Back)', icon: <GiArmSling size={40} style={{ transform: 'scaleX(-1) scaleY(-1)' }} /> },
      { id: 'backLeftHand', name: 'Left Hand (Back)', icon: <MdOutlineFrontHand size={40} style={{ transform: 'rotate(180deg)' }} /> },
      { id: 'backRightHand', name: 'Right Hand (Back)', icon: <MdOutlineFrontHand size={40} style={{ transform: 'scaleY(-1)' }} /> },
      { id: 'backLeftLeg', name: 'Left Leg (Back)', icon: <GiLeg size={40} style={{ transform: 'scaleY(-1)' }} /> },
      { id: 'backRightLeg', name: 'Right Leg (Back)', icon: <GiLeg size={40} style={{ transform: 'scaleX(-1) scaleY(-1)' }} /> },
      { id: 'backLeftFoot', name: 'Left Foot (Back)', icon: <FaShoePrints size={40} style={{ transform: 'rotate(180deg)' }} /> },
      { id: 'backRightFoot', name: 'Right Foot (Back)', icon: <FaShoePrints size={40} style={{ transform: 'scaleX(-1) rotate(180deg)' }} /> },
    ]
  };
  
  // Toggle between front and back view
  const toggleView = (view) => {
    setActiveView(view);
  };
  
  // Handle body part selection
  const handleBodyPartClick = (partId) => {
    // Check if part is already selected
    const existingIndex = selectedWounds.findIndex(wound => wound.partId === partId);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      const updatedWounds = [...selectedWounds];
      updatedWounds.splice(existingIndex, 1);
      
      // Renumber remaining wounds
      const renumberedWounds = updatedWounds.map((wound, index) => ({
        ...wound,
        number: index + 1
      }));
      
      setSelectedWounds(renumberedWounds);
    } else {
      // Add new wound
      const part = bodyParts[activeView].find(p => p.id === partId);
      if (part) {
        const newWound = {
          id: Date.now().toString(),
          partId: partId,
          name: part.name,
          number: selectedWounds.length + 1,
          view: activeView,
          hasImage: false,
          images: []
        };
        setSelectedWounds([...selectedWounds, newWound]);
      }
    }
  };
  
  // Handle remove wound
  const handleRemoveWound = (id) => {
    const updatedWounds = selectedWounds.filter(wound => wound.id !== id);
    
    // Renumber remaining wounds
    const renumberedWounds = updatedWounds.map((wound, index) => ({
      ...wound,
      number: index + 1
    }));
    
    setSelectedWounds(renumberedWounds);
  };
  
  // Handle continue button click
  const handleContinue = () => {
    if (selectedWounds.length > 0) {
      setStep('capture');
      setCurrentBodyPartIndex(0);
    } else {
      alert('Please select at least one body part before proceeding.');
    }
  };
  
  // Handle capture image for current body part
  const handleCaptureCurrentBodyPart = () => {
    if (currentBodyPartIndex < selectedWounds.length) {
      const currentWound = selectedWounds[currentBodyPartIndex];
      const bodyPart = bodyParts[currentWound.view].find(p => p.id === currentWound.partId);
      
      navigate(`/body-part-capture/${patientId || 'new'}/${currentWound.partId}`, { 
        state: { 
          selectedWounds,
          bodyPartName: bodyPart ? bodyPart.name : currentWound.name
        } 
      });
    }
  };
  
  // Handle next body part
  const handleNextBodyPart = () => {
    if (currentBodyPartIndex < selectedWounds.length - 1) {
      // Move to next body part
      setCurrentBodyPartIndex(currentBodyPartIndex + 1);
    } else {
      // Show confirmation dialog when all body parts are done
      setShowConfirmation(true);
    }
  };
  
  // Handle previous body part
  const handlePrevBodyPart = () => {
    if (currentBodyPartIndex > 0) {
      setCurrentBodyPartIndex(currentBodyPartIndex - 1);
    } else {
      setStep('select');
    }
  };
  
  // Handle edit more button click
  const handleEditMore = () => {
    setShowConfirmation(false);
  };
  
  // Handle confirm done button click
  const handleConfirmDone = () => {
    // Navigate to wound assessment with all the selected wounds data
    navigate(`/wound-assessment/${patientId || 'new'}`, { 
      state: { selectedWounds } 
    });
  };
  
  // Get current body part
  const getCurrentBodyPart = () => {
    if (selectedWounds.length > 0 && currentBodyPartIndex < selectedWounds.length) {
      return selectedWounds[currentBodyPartIndex];
    }
    return null;
  };
  
  // Check if current body part has images
  const currentBodyPartHasImages = () => {
    const currentPart = getCurrentBodyPart();
    return currentPart && currentPart.hasImage;
  };
  
  return (
    <div className="body-model-container">
      {/* Back button */}
      <div className="back-header">
        <Link to={`/patient/${patientId}`} className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      {step === 'select' ? (
        <>
          <h2 className="body-model-title">Select Body Parts with Wounds</h2>
          
          {/* View selector */}
          <div className="view-selector">
            <button 
              className={`view-button ${activeView === 'front' ? 'active' : ''}`}
              onClick={() => toggleView('front')}
            >
              Front View
            </button>
            <button 
              className={`view-button ${activeView === 'back' ? 'active' : ''}`}
              onClick={() => toggleView('back')}
            >
              Back View
            </button>
          </div>
          
          {/* Body parts grid */}
          <div className="body-parts-grid">
            {bodyParts[activeView].map((part) => {
              const isSelected = selectedWounds.some(wound => wound.partId === part.id);
              const selectedWound = selectedWounds.find(wound => wound.partId === part.id);
              
              return (
                <div 
                  key={part.id} 
                  className={`body-part-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleBodyPartClick(part.id)}
                >
                  <div className="body-part-icon-container">
                    {isSelected && (
                      <div className="wound-marker">{selectedWound.number}</div>
                    )}
                    <div className="body-part-icon">
                      {part.icon}
                    </div>
                  </div>
                  <div className="body-part-name">{part.name}</div>
                </div>
              );
            })}
          </div>
          
          {/* Selected wounds list */}
          {selectedWounds.length > 0 && (
            <div className="selected-wounds-container">
              <h3>Selected Body Parts ({selectedWounds.length})</h3>
              <ul className="selected-wounds-list">
                {selectedWounds.map((wound) => (
                  <li key={wound.id} className="selected-wound-item">
                    <div className="wound-number">{wound.number}</div>
                    <div className="wound-name">{wound.name}</div>
                    <button 
                      className="remove-wound"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveWound(wound.id);
                      }}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Continue button */}
          {selectedWounds.length > 0 && (
            <button className="capture-button" onClick={handleContinue}>
              Continue to Capture Images
            </button>
          )}
        </>
      ) : (
        <>
          {/* Capture step */}
          <h2 className="body-model-title">Capture Wound Images</h2>
          
          {/* Current body part info */}
          {getCurrentBodyPart() && (
            <div className="current-body-part">
              <div className="current-body-part-header">
                <div className="current-body-part-number">
                  {currentBodyPartIndex + 1} of {selectedWounds.length}
                </div>
                <div className="current-body-part-name">
                  {getCurrentBodyPart().name}
                </div>
              </div>
              
              {/* Body part icon */}
              <div className="current-body-part-icon-container">
                {bodyParts[getCurrentBodyPart().view].find(p => p.id === getCurrentBodyPart().partId)?.icon}
              </div>
              
              {/* Capture status */}
              <div className={`capture-status ${currentBodyPartHasImages() ? 'captured' : 'not-captured'}`}>
                {currentBodyPartHasImages() ? (
                  <>
                    <span className="status-icon">✓</span>
                    <span>Images captured</span>
                  </>
                ) : (
                  <>
                    <span className="status-icon">!</span>
                    <span>No images captured yet</span>
                  </>
                )}
              </div>
              
              {/* Capture button */}
              <button 
                className="capture-button"
                onClick={handleCaptureCurrentBodyPart}
              >
                <FaCamera />
                <span>{currentBodyPartHasImages() ? 'Edit Images' : 'Capture Images'}</span>
              </button>
              
              {/* Next button */}
              <button 
                className="next-button"
                onClick={handleNextBodyPart}
              >
                {currentBodyPartIndex < selectedWounds.length - 1 ? 'Next Body Part' : 'Review & Finish'}
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <button className="close-button" onClick={handleEditMore}>×</button>
            <p>Have you captured images for all selected body parts?</p>
            <div className="confirmation-buttons">
              <button className="edit-button" onClick={handleEditMore}>
                No, I need to capture more
              </button>
              <button className="done-button" onClick={handleConfirmDone}>
                Yes, continue to assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyModel; 