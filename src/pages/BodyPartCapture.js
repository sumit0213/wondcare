import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaUpload, FaHome, FaBook, FaBell, FaUser, FaTrash, FaArrowRight } from 'react-icons/fa';
import '../styles/BodyPartCapture.css';

const BodyPartCapture = () => {
  const { patientId, bodyPartId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [bodyPartName, setBodyPartName] = useState('');
  const [allSelectedWounds, setAllSelectedWounds] = useState([]);
  
  // Get body part name and all selected wounds from location state
  useEffect(() => {
    if (location.state) {
      if (location.state.bodyPartName) {
        setBodyPartName(location.state.bodyPartName);
      }
      if (location.state.selectedWounds) {
        setAllSelectedWounds(location.state.selectedWounds);
      }
    }
  }, [location]);
  
  // Handle file upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        name: file.name,
        date: new Date().toLocaleDateString(),
        type: 'upload',
        bodyPartId: bodyPartId
      }));
      
      setImages([...images, ...newImages]);
    }
  };
  
  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Mock camera capture
  const handleCameraCapture = () => {
    setShowCamera(true);
    setCurrentImageIndex(null);
  };
  
  // Mock taking a photo
  const takePhoto = () => {
    const newImage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      url: 'https://via.placeholder.com/300x300?text=Wound+Image+' + (images.length + 1),
      name: `${bodyPartName} Image ${images.length + 1}`,
      date: new Date().toLocaleDateString(),
      type: 'capture',
      bodyPartId: bodyPartId
    };
    
    setImages([...images, newImage]);
    setShowCamera(false);
  };
  
  // Remove an image
  const removeImage = (id) => {
    setImages(images.filter(image => image.id !== id));
  };
  
  // Edit an image (re-take)
  const editImage = (index) => {
    setCurrentImageIndex(index);
    setShowCamera(true);
  };
  
  // Replace an image after editing
  const replaceImage = () => {
    if (currentImageIndex !== null) {
      const updatedImages = [...images];
      updatedImages[currentImageIndex] = {
        ...updatedImages[currentImageIndex],
        url: 'https://via.placeholder.com/300x300?text=Edited+Image+' + Date.now(),
        date: new Date().toLocaleDateString()
      };
      
      setImages(updatedImages);
      setShowCamera(false);
      setCurrentImageIndex(null);
    }
  };
  
  // Cancel camera
  const cancelCamera = () => {
    setShowCamera(false);
    setCurrentImageIndex(null);
  };
  
  // Handle next button click
  const handleNext = () => {
    // Update the wound with hasImage flag
    const updatedWounds = allSelectedWounds.map(wound => {
      if (wound.partId === bodyPartId) {
        return { ...wound, hasImage: true, images: images };
      }
      return wound;
    });
    
    // Navigate back to body model with updated data
    navigate(`/body-model/${patientId}`, { 
      state: { 
        selectedWounds: updatedWounds,
        returnFromCapture: true
      } 
    });
  };
  
  return (
    <div className="body-part-capture-container">
      {/* Back button */}
      <div className="back-header">
        <Link to={`/body-model/${patientId}`} className="back-button" state={{ selectedWounds: allSelectedWounds }}>
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      {/* Title */}
      <h2 className="capture-title">Capture {bodyPartName} Wound</h2>
      
      {/* Patient info banner */}
      <div className="patient-info-banner">
        <p>Patient ID: {patientId}</p>
      </div>
      
      {/* Main content */}
      <div className="capture-content">
        {!showCamera ? (
          <>
            {/* Image gallery */}
            {images.length > 0 && (
              <div className="image-gallery">
                {images.map((image, index) => (
                  <div key={image.id} className="image-card">
                    <div className="image-preview">
                      <img src={image.url} alt={`Wound ${index + 1}`} />
                    </div>
                    <div className="image-info">
                      <p className="image-name">{image.name}</p>
                      <p className="image-date">{image.date}</p>
                    </div>
                    <div className="image-actions">
                      <button className="edit-button" onClick={() => editImage(index)}>
                        <FaCamera />
                      </button>
                      <button className="delete-button" onClick={() => removeImage(image.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Capture options */}
            <div className="capture-options">
              <button className="capture-button" onClick={handleCameraCapture}>
                <FaCamera />
                <span>Capture wound image</span>
              </button>
              
              <div className="upload-option">
                <button className="upload-button" onClick={triggerFileInput}>
                  <FaUpload />
                  <span>Upload from gallery</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  multiple
                  style={{ display: 'none' }} 
                />
              </div>
            </div>
            
            {/* Next button (only show if there are images) */}
            {images.length > 0 && (
              <button 
                className="next-button" 
                onClick={handleNext}
              >
                <span>Save and Continue</span>
                <FaArrowRight />
              </button>
            )}
          </>
        ) : (
          <div className="camera-view">
            <div className="camera-preview">
              <div className="mock-camera">
                <p>Camera Preview</p>
                <p>(This is a mock camera view)</p>
              </div>
            </div>
            <div className="camera-controls">
              <button className="cancel-button" onClick={cancelCamera}>Cancel</button>
              <button className="take-photo-button" onClick={currentImageIndex !== null ? replaceImage : takePhoto}>
                {currentImageIndex !== null ? 'Replace Photo' : 'Take Photo'}
              </button>
            </div>
          </div>
        )}
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
        <Link to="/profile" className="nav-item">
          <FaUser />
          <span>Profile</span>
        </Link>
      </div>
      <div className="bottom-indicator"></div>
    </div>
  );
};

export default BodyPartCapture; 