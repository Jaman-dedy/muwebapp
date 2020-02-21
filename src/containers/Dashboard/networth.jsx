import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Networth from 'components/Dashboard/Networth/networth';
import getUserInfo from 'redux/actions/users/getUserInfo';

const NetworthContainer = () => {
  const [showWallet, setShowWallet] = useState(true);
  const { networth, userData } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfo()(dispatch);
  }, []);

  return (
    <Networth
      showWallet={showWallet}
      userData={userData}
      networth={networth}
      setShowWallet={setShowWallet}
    />
  );
};

export default NetworthContainer;
