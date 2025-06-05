import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Product from './pages/Product/Product';
import User from './pages/User/User';
import Statistics from './pages/Statistics/Statistics';
import Camera from './pages/Camera/Camera';
import Face from './pages/Face/Face';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/user" element={<User />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/face" element={<Face />} />
          <Route path="/" element={<Navigate to="/product" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 