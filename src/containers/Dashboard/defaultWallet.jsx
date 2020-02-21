import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultWallet from 'components/Dashboard/DefaultWallet/defaultWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';

const DefaultWalletContainer = () => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const loadWalletInformation = () => {
    getUserInfo()(dispatch);
  };
  useEffect(() => {
    loadWalletInformation();
  }, []);
  useEffect(() => {
    if (
      userData.error &&
      userData.error.error &&
      JSON.stringify(userData.error.error).includes('Token')
    ) {
      loadWalletInformation();
    }
  }, [userData]);
  const [showWallet, setShowWallet] = useState(true);
  return (
    <DefaultWallet
      showWallet={showWallet}
      data={userData}
      refreshWallet={loadWalletInformation}
      setShowWallet={setShowWallet}
    />
  );
};

DefaultWalletContainer.propTypes = {};

export default DefaultWalletContainer;
