// eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from 'semantic-ui-react';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import MoneySegment from 'components/common/MoneySegment';

const DefaultWallet = ({
  data: { data, error },
  refreshWallet,
  newDefaultWalletLoading,
  loading,
  wallet
}) => {
  return (
    <>
      <div className="overviewcard">
        <div
          style={
            !newDefaultWalletLoading
              ? {
                  display: 'flex',
                  paddingBottom: '12px',
                }
              : {
                  display: 'flex',
                }
          }
        >
          <h2 className="welcome-text">
            <span className="medium-text font-light">
              {global.translate('My default', 1930)}
            </span>
            <br />
            <span className="bold">{global.translate('Wallet')}</span>
          </h2>
          {newDefaultWalletLoading && (
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
            </Placeholder>
          )}
        </div>
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
        {!error && !loading && data && (
          <MoneySegment
            loading={newDefaultWalletLoading}
            data={{
              Flag: wallet?.Flag,
              Currency: wallet.CurrencyCode,
              Balance: wallet?.Balance,
              Language: data && data.Language,
            }}
          />
        )}
        {loading && (
          <LoaderComponent
            loaderContent={global.translate('Working…', 412)}
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
  newDefaultWalletLoading: PropTypes.bool,
};
DefaultWallet.defaultProps = {
  refreshWallet: () => {},
  loading: false,
  newDefaultWalletLoading: false,
};

export default DefaultWallet;
