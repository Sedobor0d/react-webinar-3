import React, { memo } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthNavbar = ({ username, token, userPage, onLogIn, onLogOut, t }) => {

   const callbacks = {
      LogIn: () => onLogIn(),
      onLogOut: () => onLogOut(),
   }

   return (
      <div className='AuthNavbar'>
         {token ? (
            <>
               <Link to={userPage} className='AuthNavbar-username'>{username}</Link>
               <button className='AuthNavbar-btn' onClick={callbacks.onLogOut}>{t('auth-title.logout')}</button>
            </>
         ) : (
            <button className='AuthNavbar-btn' onClick={callbacks.LogIn}>{t('auth-title.login')}</button>
         )}
      </div>
   );
};

AuthNavbar.propTypes = {
   username: PropTypes.string,
   userPage: PropTypes.string,
   onLogIn: PropTypes.func,
   onLogOut: PropTypes.func,
   t: PropTypes.func
}

AuthNavbar.defaultProps = {
   onLogIn: () => {
   },
   onLogOut: () => {
   },
   t: (text) => text
}

export default memo(AuthNavbar);