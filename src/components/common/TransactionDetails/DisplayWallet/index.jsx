import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const DisplayWallet = ({
  title,
  walletNumber,
  walletFlag,
  selectedCard,
  isOnStore,
  storeName,
}) => {
  return (
    <div className="display-wallet">
      <div className="display-wallet-title">{title}</div>
      <div className="wallets-infos">
        {selectedCard !== 3 && !isOnStore && (
          <Image src={walletFlag} />
        )}
        <div>{isOnStore ? storeName : walletNumber}</div>
      </div>
    </div>
  );
};
DisplayWallet.propTypes = {
  walletNumber: PropTypes.string,
  title: PropTypes.string,
  walletFlag: PropTypes.string,
  selectedCard: PropTypes.number,
  isOnStore: PropTypes.bool,
  storeName: PropTypes.string,
};
DisplayWallet.defaultProps = {
  walletNumber: '',
  title: '',
  walletFlag: '',
  selectedCard: 1,
  isOnStore: false,
  storeName: '',
};

export default DisplayWallet;
