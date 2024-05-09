import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';

const UserProfile = ({ username }) => {
  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State to store random color
  const [randomColor, setRandomColor] = useState('');

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Function to generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // Check if random color is stored in local storage
    const storedColor = localStorage.getItem('randomColor');
    if (storedColor) {
      // If color is stored, use it
      setRandomColor(storedColor);
    } else {
      // If color is not stored, generate new color
      const newColor = getRandomColor();
      // Save new color to local storage
      localStorage.setItem('randomColor', newColor);
      setRandomColor(newColor);
    }
  }, []);

  return (
    <div className="nav-link nav-profile d-flex align-items-center pe-0">
      <span onClick={toggleDropdown}>
        <Avatar name={username} size="40" round={true} color={randomColor} />
      </span>
      {/* Dropdown menu */}
   
      <span className="d-none d-md-block dropdown-toggle ps-2" onClick={toggleDropdown}>{username}</span>
    </div>
  );
};

export default UserProfile;
