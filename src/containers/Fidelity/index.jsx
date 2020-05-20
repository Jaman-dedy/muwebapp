import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Fidelity from 'components/Fidelity';
import referrals from './referrals';

const FidelityContainer = () => {
  const { userData } = useSelector(({ user }) => user);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <Fidelity
      userData={userData}
      activeTabIndex={activeTabIndex}
      setActiveTabIndex={setActiveTabIndex}
      referrals={referrals()}
    />
  );
};

export default FidelityContainer;
