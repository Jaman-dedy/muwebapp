import initialState from 'redux/initial-states/user';
import loginReducer from './login';
import verifyPhoneNumberReducer from './verifyPhoneNumber';
import sendOTPReducer from './sendOTP';
import verifyOTPReducer from './verifyOTP';
import clearPhoneNumberAndOTPStoreReducer from './clearPhoneNumberAndOTPStore';
import verifyPIDReducer from './verifyPID';
import registerUserReducer from './registerUser';
import userLocationDataReducer from './userLocationData';
import countryCurrenciesReducer from './countryCurrencies';
import myWalletsReducer from './myWallets';
import resetPasswordPrequalification from './resetPasswordPrequalification';
import userSecurityQuestions from './userSecurityQuestions';
import resetPassword from './resetPassword';
import getUserInfo from './getUserInfo';
import getUserCurrencies from './getUserCurrencies';
import getUserNetworth from './getUserNetworth';
import getTransactionHistory from './getTransactionHistory';
import getUserDataReducer from './getUserData';
import getSupportedLanguagesReducer from './getSupportedLanguages';
import getLanguageReducer from './getLanguage';
import myStoresReducer from './myStores';
import addWallet from './addWallets';
import editWallet from './editWallet';
import deleteWallet from './deleteWallet';
import getCurrenciesList from './getCurrenciesList';
import setAsDefault from './setAsDefault';
import getCurrencyNetworth from './getCurrencyNetworth';
import notificationsReducer from './notifications';
import makeNotificationsSeenReducer from './makeNotificationsSeen';
import deleteNotificationsReducer from './deleteNotifications';
import setStoreStatus from './setStoreStatus';
import deleteStore from './deleteStore';
import setPresenceStatus from './setPresenceStatus';
import logout from './logout';
import userIdData from './saveUserIdData';
import verifyEmail from './verifyEmail';

export default (state = initialState, action = {}) => ({
  ...state,
  ...loginReducer(state, action),
  ...logout(state, action),
  ...verifyPhoneNumberReducer(state, action),
  ...sendOTPReducer(state, action),
  ...verifyOTPReducer(state, action),
  ...clearPhoneNumberAndOTPStoreReducer(state, action),
  ...verifyPIDReducer(state, action),
  ...registerUserReducer(state, action),
  ...userLocationDataReducer(state, action),
  ...myWalletsReducer(state, action),
  ...countryCurrenciesReducer(state, action),
  ...resetPasswordPrequalification(state, action),
  ...userSecurityQuestions(state, action),
  ...resetPassword(state, action),
  ...getUserInfo(state, action),
  ...getUserCurrencies(state, action),
  ...getUserNetworth(state, action),
  ...getCurrencyNetworth(state, action),
  ...getTransactionHistory(state, action),
  ...getUserDataReducer(state, action),
  ...getSupportedLanguagesReducer(state, action),
  ...getLanguageReducer(state, action),
  ...myStoresReducer(state, action),
  ...setStoreStatus(state, action),
  ...deleteStore(state, action),
  ...addWallet(state, action),
  ...editWallet(state, action),
  ...deleteWallet(state, action),
  ...getCurrenciesList(state, action),
  ...setAsDefault(state, action),
  ...notificationsReducer(state, action),
  ...makeNotificationsSeenReducer(state, action),
  ...deleteNotificationsReducer(state, action),
  ...setPresenceStatus(state, action),
  ...userIdData(state, action),
  ...verifyEmail(state, action),
});
