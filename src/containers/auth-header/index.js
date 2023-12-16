import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import AuthNavbar from '../../components/auth-navbar';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

const AuthHeader = () => {

   const store = useStore();
   const navigate = useNavigate();
   const { t } = useTranslate();

   const select = useSelector(state => ({
      username: state.user.profile.name,
   }));

   const callbacks = {
      onLogIn: useCallback(() => navigate('/login'), [store]),
      onLogOut: useCallback(() => store.actions.user.logOut(), [store]),
   }

   return (
      <AuthNavbar
         username={select.username}
         userPage={`/profile/${select.username}`}
         onLogIn={callbacks.onLogIn}
         onLogOut={callbacks.onLogOut}
         t={t}
      />
   );
};

export default memo(AuthHeader);