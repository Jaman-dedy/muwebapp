import initialState from 'redux/initial-states/dashboard';
import getSuppliersCountries from './getSuppliersCountries';
import getSuppliers from './getSuppliers';
import transferConfirmation from './transferConfirmation';
import transferFund from './transferFund';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getSuppliersCountries(state, action),
  ...getSuppliers(state, action),
  ...transferConfirmation(state, action),
  ...transferFund(state, action),
});
