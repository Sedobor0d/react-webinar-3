import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const WarningLogin = (props) => {

   const callbacks = {
      closeComment: () => props.closeComment(),
      toLogin: () => props.toLogin(),
   };

   return (
      <>
         {props.activeModal === 'newResponse' && (
            <div className='WarningLogin WarningLogin--response'>
               <span onClick={callbacks.toLogin} className='WarningLogin-link'>Войдите</span>
               <span>, чтобы иметь возможность ответить.
                  <span className='WarningLogin-cancel' onClick={callbacks.closeComment}>Отмена</span>
               </span>
            </div>
         )}
         {props.activeModal === 'newComment' && (
            <div className='WarningLogin'>
               <span onClick={callbacks.toLogin} className='WarningLogin-link'>Войдите</span>
               <span>, чтобы иметь возможность комментировать</span>
            </div>
         )}
      </>
   );
};

WarningLogin.propTypes = {
   closeComment: PropTypes.func.isRequired,
   toLogin: PropTypes.func.isRequired,
   activeModal: PropTypes.string.isRequired,
};

export default memo(WarningLogin);