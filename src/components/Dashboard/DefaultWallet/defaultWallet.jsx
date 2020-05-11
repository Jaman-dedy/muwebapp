import React from 'react';
import PropTypes from 'prop-types';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import MoneySegment from 'components/common/MoneySegment';
import { Loader } from 'semantic-ui-react';

const DefaultWallet = ({
  data: { data, error },
  refreshWallet,
  newDefaultWalletLoading,
  loading,
}) => {
  return (
    <>
      <div className="overviewcard">
        <div
          style={
            !newDefaultWalletLoading
              ? {
                  display: 'flex',
                  paddingBottom: '15px',
                }
              : {
                  display: 'flex',
                }
          }
        >
          <p className="sub-title">
            {global.translate('My default wallet')}
          </p>
          {newDefaultWalletLoading && <LoaderComponent />}
        </div>
        {error && !loading && (
          <Message
            message={
              error.error.error
                ? global.translate(error.error.error)
                : global.translate('Something went wrong')
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
              Flag: data.CurrencyFlag,
              Currency: data.Currency,
              Balance: data.Balance,
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
};
DefaultWallet.defaultProps = {
  refreshWallet: () => {},
};

export default DefaultWallet;
