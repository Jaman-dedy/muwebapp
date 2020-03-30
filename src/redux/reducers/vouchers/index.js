import initialState from 'redux/initial-states/vouchers';
import getCountries from './getCountries';
import getExternalContacts from './getExternalContacts';
import getInternalContacts from './getInternalContacts';
import getStores from './getStores';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getCountries(state, action),
  ...getExternalContacts(state, action),
  ...getInternalContacts(state, action),
  ...getStores(state, action),
});
