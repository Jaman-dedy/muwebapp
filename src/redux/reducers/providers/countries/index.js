import initialState from 'redux/initial-states/providersCountries';
import getProvidersCountries from './countryList';
import getProviders from './providers';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getProvidersCountries(state, action),
  ...getProviders(state, action),
});
