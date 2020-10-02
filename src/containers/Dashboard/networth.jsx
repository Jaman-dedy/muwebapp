import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Networth from 'components/Dashboard/Networth/networth';

const NetworthContainer = ({ scope }) => {
  const [showWallet, setShowWallet] = useState(true);
  const { networth, userData, currencyNetworth } = useSelector(
    state => state.user,
  );

  return (
    <Networth
      showWallet={showWallet}
      userData={userData}
      networth={scope === 'TOTAL' ? networth : currencyNetworth}
      scope={scope}
      subTitle={
        scope === 'TOTAL'
          ? `${global.translate(
              'My total net worth in',
              1736,
            )} :  ${userData.data && userData.data?.Currency}`
          : ``
      }
      setShowWallet={setShowWallet}
    />
  );
};
NetworthContainer.propTypes = {
  scope: PropTypes.string,
};

NetworthContainer.defaultProps = {
  scope: 'TOTAL',
};

export default NetworthContainer;
