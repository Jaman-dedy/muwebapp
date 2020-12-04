import user from 'redux/reducers/users';
import dashboard from 'redux/reducers/dashboard';
import addMoney from 'redux/reducers/addMoney';
import contacts from 'redux/reducers/contacts';
import payBills from 'redux/reducers/payBills';
import moneyTransfer from 'redux/reducers/moneyTransfer';
import stores from 'redux/reducers/stores';
import transactions from 'redux/reducers/transactions';
import countries from 'redux/reducers/countries';
import voucher from 'redux/reducers/vouchers';
import userAccountManagement from 'redux/reducers/userAccountManagement';
import publicity from 'redux/reducers/publicity';
import chat from 'redux/reducers/chat';
import providersCountries from 'redux/reducers/providers/countries';
import virtualCard from 'redux/reducers/virtualCard';
import creditCard from 'redux/reducers/credit-card';
import peerServices from 'redux/reducers/peerServices';
import imageGallery from 'redux/reducers/imageGallery';
import authWrapper from 'redux/reducers/authWrapper';
import email from 'redux/reducers/sendEmail';
import remindUsername from 'redux/reducers/remindUsername';

export default {
  dashboard,
  imageGallery,
  user,
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
  publicity,
  chat,
  virtualCard,
  creditCard,
  peerServices,
  authWrapper,
  email,
  remindUsername,
};
