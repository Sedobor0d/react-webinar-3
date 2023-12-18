import React, { memo, useCallback, useLayoutEffect } from 'react';
import Form from '../../components/form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import AuthHeader from '../../containers/auth-header';

const FormAuth = () => {
   const { t } = useTranslate();

   const store = useStore();

   useLayoutEffect(() => {
      store.actions.user.setServerError()
   }, [])

   const select = useSelector(state => ({
      serverError: state.user.serverError,
      fieldLog: state.inputauth.fieldLog,
      fieldPass: state.inputauth.fieldPass,
   }));

   const callbacks = {
      formSubmit: useCallback((data) => store.actions.user.logIn(data), [store]),
      onChangeLog: useCallback((text) => store.actions.inputauth.onChangeLog(text), [store]),
      onChangePass: useCallback((text) => store.actions.inputauth.onChangePass(text), [store]),
   }

   return (
      <PageLayout>
         <AuthHeader />
         <Head title={t('title')}>
            <LocaleSelect />
         </Head>
         <Navigation />
         <Form
            title={t('auth-title.login')}
            btn={t('auth-btn.login')}
            callbacks={callbacks}
            select={select}
            t={t}
         />
      </PageLayout>
   );
};

export default memo(FormAuth);