import React from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const DisplayWallet = ({ title, walletNumber, walletFlag }) => {
  return (
    <div className="display-wallet">
      <div className="display-wallet-title">{title}</div>
      <div className="wallets-infos">
        <Image src={walletFlag} />
        <div>{walletNumber}</div>
      </div>
    </div>
  );
};
DisplayWallet.propTypes = {
  walletNumber: PropTypes.string,
  title: PropTypes.string,
  walletFlag: PropTypes.string,
};
DisplayWallet.defaultProps = {
  walletNumber: '',
  title: '',
  walletFlag: '',
};

export default DisplayWallet;
