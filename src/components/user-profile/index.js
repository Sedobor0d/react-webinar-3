import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const UserProfile = memo((props) => {
   return (
      <div className='UserProfile'>
         <h2>{props.t('user-profile.title')}</h2>
         <div className='UserProfile-container'>
            <p>{props.t('user-profile.name')}: <span >{props.select.name}</span></p>
            <p>{props.t('user-profile.telephone')}: <span>{props.select.phone}</span></p>
            <p>{props.t('user-profile.email')}: <span>{props.select.email}</span></p>
         </div>
      </div>
   );
});

UserProfile.propTypes = {
   select: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      email: PropTypes.string
   }).isRequired,
   t: PropTypes.func
};

UserProfile.defaultProps = {
   t: (text) => text
}

export default memo(UserProfile);