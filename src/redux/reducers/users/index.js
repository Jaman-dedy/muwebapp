import initialState from 'redux/initial-states/user';
import loginReducer from './login';
import searchUserReducer from './searchUser';
import verifyPhoneNumberReducer from './verifyPhoneNumber';
import sendOTPReducer from './sendOTP';
import verifyOTPReducer from './verifyOTP';
import clearPhoneNumberAndOTPStoreReducer from './clearPhoneNumberAndOTPStore';
import verifyPIDReducer from './verifyPID';
import registerUserReducer from './registerUser';
import userLocationDataReducer from './userLocationData';
import countryCurrenciesReducer from './countryCurrencies';
import myWalletsReducer from './myWallets';
import getUserInfo from './getUserInfo';
import getUserCurrencies from './getUserCurrencies';
import getUserNetworth from './getUserNetworth';
import getTransactionHistory from './getTransactionHistory';

export default (state = initialState, action = {}) => ({
  ...state,
  ...loginReducer(state, action),
  ...searchUserReducer(state, action),
  ...verifyPhoneNumberReducer(state, action),
  ...sendOTPReducer(state, action),
  ...verifyOTPReducer(state, action),
  ...clearPhoneNumberAndOTPStoreReducer(state, action),
  ...verifyPIDReducer(state, action),
  ...registerUserReducer(state, action),
  ...userLocationDataReducer(state, action),
  ...myWalletsReducer(state, action),
  ...countryCurrenciesReducer(state, action),
  ...getUserInfo(state, action),
  ...getUserCurrencies(state, action),
  ...getUserNetworth(state, action),
  ...getTransactionHistory(state, action),
});
