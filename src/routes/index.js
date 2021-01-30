import login from './login';
import register from './register';
import dashboard from './dashboard';
import resetPassword from './resetPassword';
import addMoney from './addMoney';
import contacts from './contacts/index';
import moneyTransfer from './moneyTransfer';
import sendMoney from './sendMoney';
import services from './services';
import stores from './stores';
import transactions from './transactions';
import transactionDetail from './transactionDetail';
import wallets from './wallets';
import vouchers from './voucher';
import accountManagement from './accountManagement';
import notifications from './notifications';
import fidelity from './fidelity';
import publicity from './publicity/index';
import virtualCard from './virtualCard';
import creditCard from './creditCard';
import getHelp from './getHelp';
import peerservices from './peerServices';
import getPaid from './getPaid';
import quickPay from './quickPay';
import remindUsername from './remind-username';

export default [
  login,
  dashboard,
  resetPassword,
  register,
  ...contacts,
  addMoney,
  moneyTransfer,
  sendMoney,
  services,
  ...stores,
  transactions,
  transactionDetail,
  wallets,
  vouchers,
  addMoney,
  wallets,
  vouchers,
  accountManagement,
  notifications,
  fidelity,
  ...publicity,
  ...virtualCard,
  ...creditCard,
  getHelp,
  ...peerservices,
  getPaid,
  quickPay,
  remindUsername,
];
