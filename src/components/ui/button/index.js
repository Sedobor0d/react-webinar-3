import React from "react";
import PropTypes from "prop-types";
import './style.css';

const MyButton = ({ children, ...props }) => {
   return (
      <button {...props} className="MyButton">
         {children}
      </button>
   );
};

MyButton.propTypes = {
   children: PropTypes.node,
}

export default React.memo(MyButton);