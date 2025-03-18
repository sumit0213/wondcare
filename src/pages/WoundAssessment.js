import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCamera, FaUpload, FaHome, FaBook, FaBell, FaUser, FaPlus, FaTrash, FaArrowRight, FaEdit, FaSpinner } from 'react-icons/fa';
import '../styles/WoundAssessment.css';
import axios from 'axios';

const WoundAssessment = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedWounds, setSelectedWounds] = useState([]);
  const [activeWoundIndex, setActiveWoundIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [woundAnalysis, setWoundAnalysis] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load selected wounds from location state
  useEffect(() => {
    if (location.state && location.state.selectedWounds) {
      setSelectedWounds(location.state.selectedWounds);
    }
  }, [location]);
  
  // Handle edit images for a specific body part
  const handleEditImages = (partId) => {
    const wound = selectedWounds.find(w => w.partId === partId);
    if (wound) {
      navigate(`/body-part-capture/${patientId || 'new'}/${partId}`, { 
        state: { 
          selectedWounds,
          bodyPartName: wound.name
        } 
      });
    }
  };
  
  // Handle continue to assessment
  const handleContinueToAssessment = async () => {
    setIsAnalyzing(true);
    
    try {
      // Prepare data for analysis
      const woundsWithImages = selectedWounds.filter(wound => 
        wound.images && wound.images.length > 0
      );
      
      if (woundsWithImages.length === 0) {
        alert("No images found for analysis. Please capture at least one image.");
        setIsAnalyzing(false);
        return;
      }
      
      // Call the GPT API for wound analysis
      const analysisResults = await callGptApi(woundsWithImages);
      
      setWoundAnalysis(analysisResults);
      setShowAnalysis(true);
    } catch (error) {
      console.error("Error analyzing wounds:", error);
      alert("An error occurred during wound analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Function to call GPT API
  const callGptApi = async (wounds) => {
    // Prepare the data to send to the API
    const requestData = {
      wounds: wounds.map(wound => ({
        id: wound.partId,
        name: wound.name,
        images: wound.images.map(img => ({
          url: img.url,
          date: img.date
        }))
      }))
    };
    
    try {
      // Since we don't have a real backend yet, we'll use the mock data
      // In a real application, you would uncomment the fetch code below
      // and replace the URL with your actual API endpoint
      
      /*
      const response = await fetch('https://api.example.com/analyze-wounds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results;
      */
      
      // For now, use mock data
      console.log("Using mock data for wound analysis");
      return mockGptAnalysis(wounds);
      
    } catch (error) {
      console.error("Error calling GPT API:", error);
      // Fallback to mock data if API fails
      return mockGptAnalysis(wounds);
    }
  };
  
  // Mock GPT analysis function
  const mockGptAnalysis = async (wounds) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock analysis results
    const results = {};
    
    wounds.forEach(wound => {
      results[wound.partId] = {
        woundType: getRandomWoundType(),
        severity: getRandomSeverity(),
        size: getRandomSize(),
        color: getRandomColor(),
        treatment: getRandomTreatment(),
        healingStage: getRandomHealingStage(),
        riskFactors: getRandomRiskFactors(),
        recommendations: getRandomRecommendations()
      };
    });
    
    return results;
  };
  
  // Helper functions for mock data
  const getRandomWoundType = () => {
    const types = ['Pressure Ulcer', 'Venous Ulcer', 'Diabetic Ulcer', 'Surgical Wound', 'Laceration', 'Abrasion', 'Burn'];
    return types[Math.floor(Math.random() * types.length)];
  };
  
  const getRandomSeverity = () => {
    const severities = ['Mild', 'Moderate', 'Severe'];
    return severities[Math.floor(Math.random() * severities.length)];
  };
  
  const getRandomSize = () => {
    return `${(Math.random() * 10).toFixed(1)} cm x ${(Math.random() * 10).toFixed(1)} cm`;
  };
  
  const getRandomColor = () => {
    const colors = ['Red', 'Yellow', 'Black', 'Pink', 'Red-Yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const getRandomTreatment = () => {
    const treatments = [
      'Clean with saline solution and apply hydrocolloid dressing',
      'Debridement recommended, followed by antimicrobial dressing',
      'Apply compression therapy and moist wound dressing',
      'Clean with antiseptic solution and apply foam dressing',
      'Surgical consultation recommended'
    ];
    return treatments[Math.floor(Math.random() * treatments.length)];
  };
  
  const getRandomHealingStage = () => {
    const stages = ['Inflammatory', 'Proliferative', 'Maturation', 'Stalled'];
    return stages[Math.floor(Math.random() * stages.length)];
  };
  
  const getRandomRiskFactors = () => {
    const factors = ['Diabetes', 'Poor Circulation', 'Immobility', 'Malnutrition', 'Infection'];
    const numFactors = Math.floor(Math.random() * 3) + 1;
    const selectedFactors = [];
    
    for (let i = 0; i < numFactors; i++) {
      const factor = factors[Math.floor(Math.random() * factors.length)];
      if (!selectedFactors.includes(factor)) {
        selectedFactors.push(factor);
      }
    }
    
    return selectedFactors;
  };
  
  const getRandomRecommendations = () => {
    const recommendations = [
      'Change dressing every 48 hours',
      'Monitor for signs of infection',
      'Elevate affected area when possible',
      'Maintain adequate nutrition and hydration',
      'Follow up with healthcare provider in 7 days',
      'Consider offloading pressure from the area'
    ];
    
    const numRecommendations = Math.floor(Math.random() * 3) + 2;
    const selectedRecommendations = [];
    
    for (let i = 0; i < numRecommendations; i++) {
      const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
      if (!selectedRecommendations.includes(recommendation)) {
        selectedRecommendations.push(recommendation);
      }
    }
    
    return selectedRecommendations;
  };
  
  // Handle save and finish
  const handleSaveAndFinish = () => {
    // Here you would save the analysis results to your backend
    navigate(`/patient/${patientId || 'new'}`);
  };

  const handleProcessImage = async (image) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/analyze-wound', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setWoundAnalysis(response.data);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("An error occurred during image processing.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="wound-assessment-container">
      {/* Back button */}
      <div className="back-header">
        <Link to={`/body-model/${patientId || 'new'}`} className="back-button">
          <FaArrowLeft />
          <span>Back</span>
        </Link>
      </div>
      
      <h2 className="assessment-title">
        {showAnalysis ? "Wound Analysis Results" : "Wound Assessment Summary"}
      </h2>
      
      {/* Patient info banner */}
      <div className="patient-info-banner">
        <p>Patient ID: {patientId || 'New Patient'}</p>
      </div>
      
      {!showAnalysis ? (
        <>
          {/* Body parts with images */}
          <div className="body-parts-summary">
            {selectedWounds.map((wound, index) => (
              <div key={wound.id} className="body-part-card">
                <div className="body-part-header">
                  <div className="body-part-name">{wound.name}</div>
                  <button 
                    className="edit-images-button"
                    onClick={() => handleEditImages(wound.partId)}
                  >
                    <FaEdit />
                  </button>
                </div>
                
                {wound.images && wound.images.length > 0 ? (
                  <div className="body-part-images">
                    {wound.images.slice(0, 3).map((image, imgIndex) => (
                      <div key={image.id} className="image-thumbnail">
                        <img src={image.url} alt={`Wound ${imgIndex + 1}`} />
                      </div>
                    ))}
                    {wound.images.length > 3 && (
                      <div className="more-images">+{wound.images.length - 3}</div>
                    )}
                  </div>
                ) : (
                  <div className="no-images-message">
                    No images captured for this body part
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Continue button */}
          <button 
            className={`continue-button ${isAnalyzing ? 'analyzing' : ''}`}
            onClick={handleContinueToAssessment}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="spinner" />
                <span>Analyzing Wounds...</span>
              </>
            ) : (
              <>
                <span>Continue to Assessment</span>
                <FaArrowRight />
              </>
            )}
          </button>
        </>
      ) : (
        /* Analysis Results */
        <div className="analysis-results">
          {selectedWounds
            .filter(wound => woundAnalysis[wound.partId])
            .map((wound) => {
              const analysis = woundAnalysis[wound.partId];
              return (
                <div key={wound.id} className="analysis-card">
                  <div className="analysis-header">
                    <h3>{wound.name} Wound</h3>
                    {wound.images && wound.images.length > 0 && (
                      <div className="analysis-image">
                        <img src={wound.images[0].url} alt={`${wound.name} Wound`} />
                      </div>
                    )}
                  </div>
                  
                  <div className="analysis-details">
                    <div className="analysis-row">
                      <span className="analysis-label">Wound Type:</span>
                      <span className="analysis-value">{analysis.woundType}</span>
                    </div>
                    <div className="analysis-row">
                      <span className="analysis-label">Severity:</span>
                      <span className={`analysis-value severity-${analysis.severity.toLowerCase()}`}>
                        {analysis.severity}
                      </span>
                    </div>
                    <div className="analysis-row">
                      <span className="analysis-label">Size:</span>
                      <span className="analysis-value">{analysis.size}</span>
                    </div>
                    <div className="analysis-row">
                      <span className="analysis-label">Color:</span>
                      <span className="analysis-value">{analysis.color}</span>
                    </div>
                    <div className="analysis-row">
                      <span className="analysis-label">Healing Stage:</span>
                      <span className="analysis-value">{analysis.healingStage}</span>
                    </div>
                    
                    <div className="analysis-section">
                      <h4>Risk Factors</h4>
                      <ul className="analysis-list">
                        {analysis.riskFactors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="analysis-section">
                      <h4>Treatment Recommendation</h4>
                      <p>{analysis.treatment}</p>
                    </div>
                    
                    <div className="analysis-section">
                      <h4>Care Recommendations</h4>
                      <ul className="analysis-list">
                        {analysis.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
            
          <button 
            className="save-button"
            onClick={handleSaveAndFinish}
          >
            Save and Finish
          </button>
        </div>
      )}
      
      {/* Process Image Button */}
      <button 
        className="process-image-button"
        onClick={() => handleProcessImage(selectedWounds[0].images[0])}
        disabled={isProcessing}
      >
        {isProcessing ? <FaSpinner className="spinner" /> : "Process Image"}
      </button>

      {/* Display Analysis Results */}
      {woundAnalysis.mean_color && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          <p>Mean Color: {woundAnalysis.mean_color.join(', ')}</p>
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

export default WoundAssessment; 