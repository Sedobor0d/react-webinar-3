import React from "react";

import styles from './style.module.css';

const MyButton = ({ children, ...props }) => {
   return (
      <button {...props} className={styles.MyButton}>
         {children}
      </button>
   );
};

export default MyButton;