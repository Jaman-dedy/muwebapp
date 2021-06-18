/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NetworthPlaceholder from 'assets/images/networth-placeholder.svg';
import formatNumber from 'utils/formatNumber';
import './style.scss';

const MyNetworth = ({ userData, scope, subTitle, networth }) => {
  const { language: { preferred } = {} } = useSelector(
    ({ user }) => user,
  );
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
                  {`${global.translate('My balance in')} `}
                  <span className="bold">
                    {' '}
                    {networth.data && networth.data.Currency}
                  </span>{' '}
                </h3>
              )}

              <div className="wallet-info">
                <img src={networth?.flag} />
                <div>
                  {formatNumber(networth?.data?.NetWorthWallets, {
                    locales: preferred,
                  })}{' '}
                  <span>{networth?.data?.Currency}</span>
                </div>
              </div>
            </div>
            <div className="one-currency">
              {scope !== 'TOTAL' && (
                <h3>
                  {`${global.translate('My networth in')} `}
                  <span className="bold">
                    {' '}
                    {networth.data && networth.data.Currency}
                  </span>{' '}
                </h3>
              )}

              <div className="wallet-info">
                <img src={networth?.flag} />
                <div>
                  {formatNumber(networth?.data?.NetWorth, {
                    locales: preferred,
                  })}{' '}
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
