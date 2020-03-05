import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultWallet from 'components/Dashboard/DefaultWallet/defaultWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';

const DefaultWalletContainer = () => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const loadWalletInformation = () => {
    if (!userData.data) {
      getUserInfo()(dispatch);
    }
  };
  useEffect(() => {
    loadWalletInformation();
  }, []);
  return (
    <DefaultWallet
      data={userData}
      refreshWallet={loadWalletInformation}
    />
  );
};

DefaultWalletContainer.propTypes = {};

export default DefaultWalletContainer;
