import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import getUserNetworth from 'redux/actions/users/getUserNetworth';
import Carousel from 'components/common/Carousel';
import './index.scss';
import LoaderComponent from 'components/common/Loader';

const UserCurrencies = ({ currencies, userData, dispatch }) => {
  return (
    <div className="user-currencies" style={{ marginLeft: '24px' }}>
      <p className="sub-title" style={{ marginBottom: 32 }}>
        {global.translate('My Currencies')}
      </p>
      <Grid>
        <Grid.Column>
          <Grid>
            {currencies.loading ? (
              <LoaderComponent
                loaderContent={global.translate('Loading currencies')}
              />
            ) : null}
            <Carousel
              data={currencies.data ? currencies.data : []}
              loading={currencies.loading}
              ownFn={() => {
                getUserNetworth({
                  PIN: '1234',
                  Currency: userData.data.Currency,
                  Scope: 'TOTAL',
                })(dispatch);
              }}
            />
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  );
};

UserCurrencies.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.any).isRequired,
  userData: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UserCurrencies;
