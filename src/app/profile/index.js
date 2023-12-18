import React, { memo } from 'react';
import UserProfile from '../../components/user-profile';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthHeader from '../../containers/auth-header';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';

const Profile = () => {

   const { t } = useTranslate();

   const select = useSelector(state => ({
      name: state.profile.profile.name,
      phone: state.profile.profile.phone,
      email: state.profile.profile.email,
   }));

   return (
      <PageLayout>
         <AuthHeader />
         <Head title={t('title')}>
            <LocaleSelect />
         </Head>
         <Navigation />
         <UserProfile select={select} t={t} />
      </PageLayout>
   );
};

export default memo(Profile);