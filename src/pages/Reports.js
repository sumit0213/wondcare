import React from 'react';

const Reports = () => {
  return (
    <div className="reports-container">
      <h1>Reports & Analytics</h1>
      
      <div className="report-filters">
        <div className="filter-group">
          <label>Date Range</label>
          <select>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Patient</label>
          <select>
            <option value="all">All Patients</option>
            <option value="p12345">John Doe (P-12345)</option>
            <option value="p67890">Jane Smith (P-67890)</option>
          </select>
        </div>
        
        <button className="generate-button">Generate Report</button>
      </div>
      
      <div className="report-summary">
        <h2>Healing Progress Summary</h2>
        <div className="chart-placeholder">
          <p>Chart visualization will appear here</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-box">
            <h3>Average Healing Rate</h3>
            <p className="stat-value">12.5%</p>
            <p className="stat-label">per week</p>
          </div>
          
          <div className="stat-box">
            <h3>Assessments</h3>
            <p className="stat-value">28</p>
            <p className="stat-label">total</p>
          </div>
          
          <div className="stat-box">
            <h3>Wounds Healed</h3>
            <p className="stat-value">8</p>
            <p className="stat-label">in period</p>
          </div>
        </div>
      </div>
      
      <div className="export-options">
        <button className="export-button">Export as PDF</button>
        <button className="export-button">Export as CSV</button>
      </div>
    </div>
  );
};

export default Reports; 