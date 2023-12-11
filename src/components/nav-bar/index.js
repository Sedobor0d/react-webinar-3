import React from 'react';
import './style.css';

const NavBar = ({ children }) => {
   return (
      <div className='NavBar'>
         {children}
      </div>
   );
};

export default NavBar;