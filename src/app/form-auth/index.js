import React, { memo, useCallback } from 'react';
import Form from '../../components/form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthHeader from '../../containers/auth-header';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';

const FormAuth = () => {
   const { t } = useTranslate();
   const store = useStore();

   useInit(() => {
      store.actions.user.setServerError()
   }, [])

   const select = useSelector(state => ({
      serverError: state.user.serverError,
      isLoading: state.profile.isLoading,
   }));

   const callbacks = {
      formSubmit: useCallback((data) => store.actions.user.logIn(data), [store])
   }

   return (
      <PageLayout>
         <AuthHeader />
         <Head title={t('title')}>
            <LocaleSelect />
         </Head>
         <Navigation />
         <Spinner active={select.isLoading}>
            <Form
               title={t('auth-title.login')}
               btn={t('auth-btn.login')}
               formSubmit={callbacks.formSubmit}
               serverError={select.serverError}
               t={t}
            />
         </Spinner>
      </PageLayout>
   );
}

export default memo(FormAuth);