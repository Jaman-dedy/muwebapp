/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import MoneySegment from 'components/common/MoneySegment';

const MyNetworth = ({ userData, scope, subTitle, networth }) => {
  return (
    <div>
      <>
        {networth.loading && (
          <LoaderComponent
            loaderContent={global.translate('Working...', 412)}
          />
        )}

        {networth.data && !networth.loading && (
          <>
            {scope === 'TOTAL' && (
              <h3 className="dash-title">{subTitle}</h3>
            )}

            {scope !== 'TOTAL' && (
              <h3 className="dash-title">
                {`${global.translate('My total balance in all ')}
            `}
                <span className="bold">{networth.data && networth.data.Currency}</span> {' '}
                Wallets
              </h3>
            )}

            <MoneySegment
              data={{
                Flag:
                  scope !== 'TOTAL'
                    ? networth.flag
                    : userData.data.CurrencyFlag,
                Currency: networth.data.Currency,
                Balance: networth.data.NetWorth,
                Language: userData.data.Language,
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

MyNetworth.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  networth: PropTypes.objectOf(PropTypes.any).isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default MyNetworth;
