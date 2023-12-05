import React from 'react';
import PropTypes from "prop-types";

import './style.css'

const Modal = ({ children }) => {
   return (
      <div className="Modal">
         <div className="Modal-container">
            {children}
         </div>
      </div>
   );
};

Modal.propTypes = {
   children: PropTypes.node,
}

export default Modal;