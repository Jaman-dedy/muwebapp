import React from 'react';
import PropTypes from 'prop-types';
import LoaderComponent from 'components/common/Loader';
import MoneySegment from 'components/common/MoneySegment';

const MyNetworth = ({ userData, networth }) => {
  return (
    <div className="overviewcard">
      {networth.loading && (
        <LoaderComponent
          loaderContent={global.translate('Working...', 412)}
        />
      )}
      {networth.data && !networth.loading && (
        <>
          <p className="sub-title">
            {global.translate('My networth in')} :{' '}
            {userData.data && userData.data.Currency}
          </p>

          <MoneySegment
            data={{
              Flag: userData.data.CurrencyFlag,
              Currency: networth.data.Currency,
              Balance: networth.data.NetWorth,
              Language: userData.data.Language,
            }}
          />
        </>
      )}
    </div>
  );
};

MyNetworth.propTypes = {
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  networth: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MyNetworth;
