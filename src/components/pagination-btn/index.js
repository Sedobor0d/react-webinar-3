import React from 'react';
import PropTypes from "prop-types";
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

PaginationBtn.propTypes = {
   children: PropTypes.number.isRequired,
   isActive: PropTypes.bool,
   setCurrentPage: PropTypes.func.isRequired,
};

export default React.memo(PaginationBtn);