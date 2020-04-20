import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultWallet from 'components/Dashboard/DefaultWallet/defaultWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getMyWallets from 'redux/actions/users/getMyWallets';

const DefaultWalletContainer = () => {
  const { userData } = useSelector(state => state.user);
  const { walletList, loading } = useSelector(
    state => state.user.myWallets,
  );
  const dispatch = useDispatch();
  const wallet = walletList.find(item => item.Default === 'YES');

  useEffect(() => {
    if (walletList.length === 0) {
      getMyWallets()(dispatch);
    }
  }, [walletList]);

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
      wallet={wallet}
      loading={loading}
      refreshWallet={loadWalletInformation}
    />
  );
};

DefaultWalletContainer.propTypes = {};

export default DefaultWalletContainer;
