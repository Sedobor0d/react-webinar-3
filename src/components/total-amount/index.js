import React from 'react';
import PropTypes from "prop-types";

import Money from '../ui/money';
import './style.css';

const TotalAmount = ({ totalAmount }) => {
   return (
      <div className="TotalAmount">
         <div className="TotalAmount-container">
            <span className="TotalAmount-sum">Итого</span>
            <Money>{totalAmount}</Money>
         </div>
      </div>
   );
};

TotalAmount.propTypes = {
   totalAmount: PropTypes.number.isRequired
};

export default TotalAmount;