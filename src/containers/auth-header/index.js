import React, { memo, useCallback, useEffect, useLayoutEffect } from 'react';
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
      username: state.profile.profile.name,
   }));

   const callbacks = {
      onLogIn: useCallback(() => navigate('/login'), [store]),
      onLogOut: useCallback(() => {
         store.actions.user.logOut()
         store.actions.profile.setProfle()
      }, [store]),
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