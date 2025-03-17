import React from 'react';

const Patients = () => {
  return (
    <div className="patients-container">
      <h1>Patients</h1>
      
      <div className="search-bar">
        <input type="text" placeholder="Search patients..." />
        <button>Search</button>
      </div>
      
      <div className="patients-list">
        <div className="patient-card">
          <h3>John Doe</h3>
          <p>ID: P-12345</p>
          <p>Age: 45</p>
          <p>Last Visit: 2023-03-15</p>
          <button>View Details</button>
        </div>
        
        <div className="patient-card">
          <h3>Jane Smith</h3>
          <p>ID: P-67890</p>
          <p>Age: 62</p>
          <p>Last Visit: 2023-03-12</p>
          <button>View Details</button>
        </div>
        
        <div className="patient-card">
          <h3>Robert Johnson</h3>
          <p>ID: P-24680</p>
          <p>Age: 58</p>
          <p>Last Visit: 2023-03-10</p>
          <button>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Patients; 