import React from 'react';
import './style.css';

const PaginationBtn = ({ children, isActive = false, setCurrentPage }) => {
   const callbacks = {
      handlePageClick: () => setCurrentPage(children)
   }

   return (
      <li className={`PaginationBtn ${isActive ? "PaginationBtn-active" : ""}`}
         onClick={callbacks.handlePageClick}>
         {children}
      </li>
   );
};

export default React.memo(PaginationBtn);