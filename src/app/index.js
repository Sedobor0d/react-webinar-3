import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import FormAuth from './form-auth';
import Profile from './profile';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  useInit(() => {
    store.actions.user.init()
  }, [store])

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    username: state.profile.profile.name,
    token: state.user.token,
  }));

  useEffect(() => {
    store.actions.profile.setUser()
  }, [select.token])

  return (
    <>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />

        {select.username ? (
          <>
            <Route path={'/profile/:id'} element={<Profile />} />
            <Route path={'/login'} element={<Navigate to={`/profile/${select.username}`} />} />
          </>
        ) : (
          <>
            <Route path={'/profile/:id'} element={<Navigate to={'/login'} />} />
            <Route path={'/login'} element={<FormAuth />} />
          </>
        )}
      </Routes>
      {select.activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
