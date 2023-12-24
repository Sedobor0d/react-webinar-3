import React, { memo, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const WarningLogin = (props) => {

   const divRef = useRef(null);

   useEffect(() => {
      const timer = setTimeout(() => {
         if (divRef.current) {
            divRef.current.focus();
         }
      }, 0);

      return () => clearTimeout(timer);
   }, []);

   const callbacks = {
      closeComment: () => props.closeComment(),
      toLogin: () => props.toLogin(),
   };

   return (
      <>
         {props.activeModal === 'newResponse' && (
            <div className='WarningLogin WarningLogin--response' ref={divRef} tabIndex={0}>
               <span onClick={callbacks.toLogin} className='WarningLogin-link'>{props.t('warning-login.warning')}</span>
               <span>, {props.t('warning-login.to-respond')}.
                  <span className='WarningLogin-cancel' onClick={callbacks.closeComment}>{props.t('warning-login.cancel')}</span>
               </span>
            </div>
         )}
         {props.activeModal === 'newComment' && (
            <div className='WarningLogin'>
               <span onClick={callbacks.toLogin} className='WarningLogin-link'>{props.t('warning-login.warning')}</span>
               <span>, {props.t('warning-login.to-comment')}</span>
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