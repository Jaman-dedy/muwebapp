import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultWallet from 'components/Dashboard/DefaultWallet/DefaultWallet';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getMyWallets from 'redux/actions/users/getMyWallets';

const DefaultWalletContainer = () => {
  const { userData } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { walletList, loading } = useSelector(
    state => state.user.myWallets,
  );

  const { loading: newDefaultWalletLoading } = useSelector(
    state => state.user.setAsDefault,
  );
  const wallet = walletList?.find(item => item.Default === 'YES');

  useEffect(() => {
    if (!walletList?.length) {
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
      newDefaultWalletLoading={newDefaultWalletLoading}
      refreshWallet={loadWalletInformation}
    />
  );
};

DefaultWalletContainer.propTypes = {};

export default DefaultWalletContainer;
