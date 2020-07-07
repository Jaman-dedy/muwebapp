import initialState from 'redux/initial-states/vouchers';
import getCountries from './getCountries';
import getStores from './getStores';
import getPendingVouchers from './getPendingVouchers';
import rejectStoreVoucher from './rejectStoreVoucher';
import searchStore from './searchStore';
import createVoucher from './createVoucher';
import selectedStore from './selectedStore';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getCountries(state, action),
  ...getStores(state, action),
  ...getPendingVouchers(state, action),
  ...rejectStoreVoucher(state, action),
  ...searchStore(state, action),
  ...createVoucher(state, action),
  ...selectedStore(state, action),
});
