import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.scss';

const WalletDropDown = ({
  walletList,
  source,
  target,
  setSourceWallet,
  setTargetWallet,
  wallet,
  allTransactionData,
}) => {
  return (
    <Dropdown
      selection
      className="wallet-numbers"
      text={
        <>
          {source ? (
            <>
              <div className="wallet-name">
                {wallet && wallet.AccountName}
              </div>{' '}
              <span>{wallet && wallet.AccountNumber}</span>
            </>
          ) : (
            <>
              <div className="wallet-name">
                {wallet.TargetAccount ? (
                  wallet.TargetAccount
                ) : (
                  <span>
                    {global.translate('Select the target wallet')}
                  </span>
                )}
              </div>{' '}
            </>
          )}
        </>
      }
    >
      <Dropdown.Menu className="sub-menu-wallet">
        {walletList &&
          source &&
          walletList.map(wallet => (
            <>
              <Dropdown.Item
                onClick={() => {
                  if (source) {
                    setSourceWallet(wallet);
                  }
                }}
              >
                <div className="wallet-name">
                  {wallet.AccountName}
                </div>{' '}
                <span>{wallet.AccountNumber}</span>
              </Dropdown.Item>
              <Dropdown.Divider />{' '}
            </>
          ))}
        {allTransactionData &&
          target &&
          allTransactionData.map(transaction => (
            <>
              <Dropdown.Item
                onClick={() => {
                  if (target) {
                    setTargetWallet(transaction);
                  }
                }}
              >
                <div className="wallet-name">
                  {transaction.TargetAccount}
                </div>{' '}
              </Dropdown.Item>
              <Dropdown.Divider />{' '}
            </>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

WalletDropDown.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  source: PropTypes.bool,
  target: PropTypes.bool,
  setSourceWallet: PropTypes.func,
  setTargetWallet: PropTypes.func,
  wallet: PropTypes.objectOf(PropTypes.any),
  allTransactionData: PropTypes.objectOf(PropTypes.any),
};
WalletDropDown.defaultProps = {
  walletList: [],
  allTransactionData: [],
  source: false,
  target: false,
  setSourceWallet: () => {},
  setTargetWallet: () => {},
  wallet: {},
};

export default WalletDropDown;
