import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

const Navigation = () => {
   return (
      <nav className='Navigation'>
         <ul>
            <li><Link to={'/'}>Главная</Link></li>
         </ul>
      </nav>
   );
};

export default Navigation;