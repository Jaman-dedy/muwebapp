import initialState from 'redux/initial-states/transactions';
import getSupportedCountries from './getSupportedCountries';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getSupportedCountries(state, action),
});
