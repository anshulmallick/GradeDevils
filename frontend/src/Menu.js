import React, { useState } from 'react';
import './Menu.css'; // Separate CSS for styling

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Menu open state

  // Toggle the menu's open state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      {/* Burger Icon */}
      <div className="burger-icon" onClick={toggleMenu}>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
        <div className={isOpen ? "line open" : "line"}></div>
      </div>

      {/* Sidebar */}
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <ul>
          <li className="sidebar-item">Assignment 1</li>
          <li className="sidebar-item">Assignment 2</li>
          <li className="sidebar-item">Assignment 3</li>
          <li className="sidebar-item">Assignment 4</li>
        </ul>
      </div>

      {/* Overlay to close the menu */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </div>
  );
};

export default Menu;
