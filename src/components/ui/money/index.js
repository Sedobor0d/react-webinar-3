import React from 'react';

const Money = ({ children, ...props }) => {
   const formattedAmount = children.toLocaleString('ru-RU', { maximumFractionDigits: 0 });

   return (
      <span {...props}>
         {formattedAmount} ₽
      </span>
   );
};

export default Money;