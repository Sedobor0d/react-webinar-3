import React from 'react';
import PropTypes from "prop-types";
import './style.css';

const PaginationLayout = ({ children }) => {
   return (
      <ul className="PaginationLayout">
         {children}
      </ul>
   );
};

PaginationLayout.propTypes = {
   children: PropTypes.node,
};

export default PaginationLayout;