import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/images/AVATOR.png';
import productIcon from '../assets/images/box icon.svg';
import userIcon from '../assets/images/USER.svg';
import statisticsIcon from '../assets/images/Statisitics.svg';
import faceAnalysisIcon from '../assets/images/face-analysis.svg';
import '../styles/shared.css';

const menuItems = [
  { icon: productIcon, label: 'Product', path: '/product' },
  { icon: userIcon, label: 'User', path: '/user' },
  { icon: statisticsIcon, label: 'Statistics', path: '/statistics' },
  { icon: faceAnalysisIcon, label: 'Analysis', path: '/face' },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-avatar-wrapper">
        <div className="sidebar-avatar" style={{ backgroundImage: `url(${avatar})` }} />
        <div className="sidebar-name">Jackson Murouse</div>
        <div className="sidebar-role">Sale Manager</div>
      </div>
      <nav className="sidebar-menu-outer">
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div
              className="sidebar-menu-item"
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
            >
              <img src={item.icon} alt={item.label + ' icon'} className="sidebar-menu-icon" />
              <span className="sidebar-menu-label">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 