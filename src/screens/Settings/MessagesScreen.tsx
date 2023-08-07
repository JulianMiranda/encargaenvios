import React, {useContext} from 'react';
import {BackButton} from '../../components/common/BackButton';
import {useNavigation} from '@react-navigation/core';
import {NoPropsInvited} from '../../components/common/NoPropsInvited';
import {AuthContext} from '../../context/auth/AuthContext';
import {CommonUserMessages} from '../../components/settings/CommonUserMessages';
import {AdminMessages} from '../../components/settings/AdminMessages';

export const MessagesScreen = () => {
  const navigation = useNavigation();
  const {status, user} = useContext(AuthContext);

  if (status !== 'authenticated') {
    return (
      <>
        <BackButton navigation={navigation} />
        <NoPropsInvited />
      </>
    );
  }
  console.log(user?.id);
  return (
    <>
      {user?.role === 'ADMIN' ? (
        <>
          <AdminMessages />
        </>
      ) : (
        <>
          <CommonUserMessages />
        </>
      )}
    </>
  );
};
