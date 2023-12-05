import React from 'react';
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

export default Modal;