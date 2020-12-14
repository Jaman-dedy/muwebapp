/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import NetworthPlaceholder from 'assets/images/networth-placeholder.svg';
import './style.scss';

const MyNetworth = ({ userData, scope, subTitle, networth }) => {
  return (
    <div>
      <>
        {networth.loading && (
          <div className="animate-placeholder networth-placeholder">
            <img src={NetworthPlaceholder} />
            <img src={NetworthPlaceholder} />
            <div className="clear"></div>
          </div>
        )}

        {networth.data && !networth.loading && (
          <>
            <div className="one-currency">
              {scope !== 'TOTAL' && (
                <h3>
                  {`${global.translate('My total amount in', 2144)} `}
                  <span className="bold">
                    {' '}
                    {networth.data && networth.data.Currency}
                  </span>{' '}
                </h3>
              )}

              <div className="wallet-info">
                <img src={networth?.flag} />
                <div>
                  {networth?.data?.NetWorthWallets}{' '}
                  <span>{networth?.data?.Currency}</span>
                </div>
              </div>
            </div>
            <div className="one-currency">
              {scope !== 'TOTAL' && (
                <h3>
                  {`${global.translate('My networth in', 2143)} `}
                  <span className="bold">
                    {' '}
                    {networth.data && networth.data.Currency}
                  </span>{' '}
                </h3>
              )}

              <div className="wallet-info">
                <img src={networth?.flag} />
                <div>
                  {networth?.data?.NetWorth}{' '}
                  <span>{networth?.data?.Currency}</span>
                </div>
              </div>
            </div>
            <div className="clear" />
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
