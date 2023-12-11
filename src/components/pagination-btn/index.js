import React from 'react';
import PropTypes from "prop-types";
import './style.css';
import { Link } from 'react-router-dom';


const PaginationBtn = ({ children, isActive = false, setCurrentPage, to }) => {
   const callbacks = {
      handlePageClick: () => setCurrentPage(children)
   }

   return (
      <Link to={`${to}/${children}`}
         className={`PaginationBtn ${isActive ? "PaginationBtn-active" : ""}`}
         onClick={callbacks.handlePageClick}
      >
         {children}
      </Link>
   );
};

PaginationBtn.propTypes = {
   children: PropTypes.number.isRequired,
   isActive: PropTypes.bool,
   setCurrentPage: PropTypes.func.isRequired,
   props: PropTypes.string
};

export default React.memo(PaginationBtn);