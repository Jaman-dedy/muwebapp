/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
// eslint-disable-line
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import Message from 'components/common/Message';
import WalletPlaceholder from 'assets/images/wallet-placeholder.svg';
import formatNumber from 'utils/formatNumber';

const DefaultWallet = ({
  data: { data, error },
  refreshWallet,
  loading,
  wallet,
}) => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
  const [showAmount, setShowAmount] = useState(true);
  return (
    <>
      <div>
        {!error && !loading && data && (
          <div className="dash-wallet">
            <h3>
              {wallet?.AccountName}{' '}
              <span>({global.translate(`Default`, 641)})</span>
            </h3>
            <div>{wallet?.AccountNumber}</div>
            <div className="wallet-info">
              <img src={wallet?.Flag} />
              <div className="wallet-amount">
                {showAmount && (
                  <div>
                    {formatNumber(wallet?.Balance, {
                      locales: preferred,
                    })}

                    <span> {wallet?.CurrencyCode}</span>
                  </div>
                )}
                {!showAmount && (
                  <span className="amount-hidden">
                    <Icon name="circle" />
                    <Icon name="circle" />
                    <Icon name="circle" />{' '}
                  </span>
                )}
              </div>
              <button
                className="show-amount"
                onClick={() => setShowAmount(!showAmount)}
              >
                {!showAmount && <Icon name="eye" />}
                {showAmount && <Icon name="eye slash" />}
              </button>
            </div>
          </div>
        )}
        {!error && loading && (
          <div className="animate-placeholder wallet-placeholder">
            <img src={WalletPlaceholder} />
          </div>
        )}
        {error && !loading && (
          <Message
            message={
              error.error.error
                ? global.translate(error.error.error)
                : global.translate('Something went wrong', 1933)
            }
            action={{
              onClick: () => {
                refreshWallet();
              },
            }}
          />
        )}
      </div>
    </>
  );
};

DefaultWallet.propTypes = {
  refreshWallet: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  wallet: PropTypes.objectOf(PropTypes.any).isRequired,
};
DefaultWallet.defaultProps = {
  refreshWallet: () => {},
  loading: false,
};

export default DefaultWallet;
