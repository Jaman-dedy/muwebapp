import user from 'redux/reducers/users';
import dashboard from 'redux/reducers/dashboardReducer';
import addMoney from 'redux/reducers/addMoney';
import contacts from 'redux/reducers/contacts';
import payBills from 'redux/reducers/payBills';
import moneyTransfer from 'redux/reducers/money-transfer';
import stores from 'redux/reducers/stores';
import transactions from 'redux/reducers/transactions';
import countries from 'redux/reducers/countries';
import voucher from 'redux/reducers/vouchers';
import userAccountManagement from 'redux/reducers/userAccountManagement';
import publicity from 'redux/reducers/publicity';
import initialState from 'redux/initialState';
import providersCountries from 'redux/reducers/providers/countries';
import logout from './users/logout';

export default {
  user,
  dashboard,
  addMoney,
  contacts,
  payBills,
  moneyTransfer,
  stores,
  transactions,
  countries,
  voucher,
  userAccountManagement,
  providersCountries,
  logout: (state = initialState, action = {}) => ({
    ...logout(state, action),
  }),
  publicity,
};
