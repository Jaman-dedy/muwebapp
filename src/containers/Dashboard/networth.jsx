import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Networth from 'components/Dashboard/Networth/networth';

const NetworthContainer = () => {
  const [showWallet, setShowWallet] = useState(true);
  const { networth, userData } = useSelector(state => state.user);

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
