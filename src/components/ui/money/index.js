import React, { useMemo } from 'react';
import PropTypes from "prop-types";

const Money = ({ children, ...props }) => {
   const formattedAmount = children.toLocaleString('ru-RU', { maximumFractionDigits: 0 });

   return (
      <span {...props}>
         {formattedAmount} ₽
      </span>
   );
};

Money.propTypes = {
   children: PropTypes.number.isRequired,
};

export default React.memo(Money);