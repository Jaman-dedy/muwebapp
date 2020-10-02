/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import getUserNetworth from 'redux/actions/users/getUserNetworth';
import Carousel from 'components/common/Carousel';
import './index.scss';
import LoaderComponent from 'components/common/Loader';
import getCurrencyNetworth from 'redux/actions/users/getCurrencyNetworth';

const UserCurrencies = ({ currencies, userData, dispatch }) => {
  return (
    <div className="user-currencies">
      <h3 className="dash-title small-v-padding">
        {global.translate('My Currencies', 1248)}
      </h3>
      <div>
        <div>
          <div>
            {currencies.loading ? (
              <LoaderComponent
                loaderContent={global.translate('Working…', 412)}
              />
            ) : null}
            {currencies.data && (
              <Carousel
                onItemClick={item => {
                  getCurrencyNetworth({
                    item,
                    Currency: item.CurrencyCode,
                  })(dispatch);
                }}
                data={currencies.data}
                ownFn={() => {
                  getUserNetworth({
                    Currency: userData.data?.Currency,
                    Scope: 'TOTAL',
                  })(dispatch);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

UserCurrencies.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UserCurrencies;
