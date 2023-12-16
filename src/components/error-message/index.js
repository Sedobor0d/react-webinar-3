import React, { memo } from 'react';
import PropTypes from 'prop-types'
import './style.css';

const ErrorMessage = ({ children }) => {
   return (
      <div className='ErrorMessage'>
         {children}
      </div>
   );
};

ErrorMessage.propTypes = {
   children: PropTypes.string.isRequired
};

export default memo(ErrorMessage);