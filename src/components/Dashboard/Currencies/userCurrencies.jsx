/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import getUserNetworth from 'redux/actions/users/getUserNetworth';
import Currencies from './MyCurrencies';
import './index.scss';
import CurrencyPlaceholder from 'assets/images/currencies-placeholder.svg';
import getCurrencyNetworth from 'redux/actions/users/getCurrencyNetworth';
import NetworthContainer from 'containers/Dashboard/networth';

const UserCurrencies = ({ currencies, userData, dispatch }) => {
  return (
    <div>
      {currencies.loading ? (
        <div className="dash-card">
          <div className="animate-placeholder currencies-placeholder">
            <img src={CurrencyPlaceholder} />
            <img src={CurrencyPlaceholder} />
            <div className="clear"></div>
          </div>
        </div>
      ) : null}
      {currencies.data && (
        <div className="dash-card" data-tut="second-step">
          <div className="user-currencies">
            <h2>
              {global.translate('MY CURRENCIES').toUpperCase()}
            </h2>
            <Currencies
              data={currencies.data}
              onItemClick={item => {
                getCurrencyNetworth({
                  item,
                  Currency: item.CurrencyCode,
                })(dispatch);
              }}
              ownFn={() => {
                getUserNetworth({
                  Currency: userData.data?.Currency,
                  Scope: 'TOTAL',
                })(dispatch);
              }}
            />
            <div className="clear" />
            <NetworthContainer scope="WALLET" />
            <br />
            <NetworthContainer scope="TOTAL" />
          </div>
        </div>
      )}
    </div>
  );
};

UserCurrencies.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UserCurrencies;
