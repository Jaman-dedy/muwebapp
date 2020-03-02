import login from './login';
import register from './register';
import dashboard from './dashboard';
import resetPassword from './resetPassword';
import addMoney from './addMoney';
import contacts from './contacts';
import moneyTransfer from './moneyTransfer';
import sendMoney from './sendMoney';
import services from './services';
import stores from './stores';
import transactions from './transactions';
import cashList from './cashList';
import transactionDetail from './transactionDetail';
import logout from './logout';
import wallets from './wallets';

export default [
  login,
  dashboard,
  resetPassword,
  register,
  contacts,
  addMoney,
  moneyTransfer,
  sendMoney,
  services,
  ...stores,
  cashList,
  transactions,
  transactionDetail,
  logout,
  wallets,
];
