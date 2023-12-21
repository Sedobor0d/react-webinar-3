import React, { memo } from 'react';
import './style.css';

const WarningLogin = (props) => {

   const callbacks = {
      closeComment: () => props.closeComment(),
      toLogin: () => props.toLogin(),
   };

   return (
      <div className='WarningLogin'>
         <span onClick={callbacks.toLogin} className='WarningLogin-link'>Войдите</span>

         {props.activeModal === 'newComment' && <span>, чтобы иметь возможность комментировать</span>}
         {props.activeModal === 'newResponse' &&
            <span>, чтобы иметь возможность ответить.
               <span className='WarningLogin-cancel' onClick={callbacks.closeComment}>Отмена</span>
            </span>
         }
      </div>
   );
};

export default memo(WarningLogin);