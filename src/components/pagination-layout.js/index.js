import React from 'react';
import './style.css';

const PaginationLayout = ({ children }) => {
   return (
      <ul className="PaginationLayout">
         {children}
      </ul>
   );
};

export default PaginationLayout;