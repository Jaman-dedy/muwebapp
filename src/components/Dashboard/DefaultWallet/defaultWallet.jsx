import React from 'react';
import PropTypes from 'prop-types';
import Message from 'components/common/Message';
import LoaderComponent from 'components/common/Loader';
import MoneySegment from 'components/common/MoneySegment';

const DefaultWallet = ({
  data: { data, loading, error },
  refreshWallet,
}) => {
  return (
    <div>
      <div className="overviewcard">
        <p className="sub-title">
          {global.translate('My default wallet')}
        </p>

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
            data={{
              Flag: data.CurrencyFlag,
              Currency: data.Currency,
              Balance: data.Balance,
              Language: data.Language,
            }}
          />
        )}
        {loading && (
          <LoaderComponent
            loaderContent={global.translate('Working…', 412)}
          />
        )}
      </div>
    </div>
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
