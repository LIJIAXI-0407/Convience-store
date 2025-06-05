import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import '../../styles/shared.css';
import './face.css';

const Face = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="face-content">
          <h1>Face Analysis</h1>
          <div className="face-controls">
            <button 
              className="start-analysis-btn"
              onClick={startAnalysis}
            >
              Start Face Analysis
            </button>
          </div>
          
          {isAnalyzing && (
            <div className="face-analysis-container">
              <iframe
                src="http://localhost:8080"
                title="Face Recognition"
                className="face-analysis-frame"
                allow="camera"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Face; 