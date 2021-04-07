import getSavedLanguage from 'helpers/getSavedLanguage';
import { DEFAULT_LANGUAGE } from 'constants/general';

export default {
  language: {
    error: null,
    loading: false,
    message: '',
    preferred: String(
      localStorage.language || DEFAULT_LANGUAGE,
    ).trim(),
    default: String(DEFAULT_LANGUAGE).trim(),
    data: getSavedLanguage(localStorage.language),
    supported: {
      data: [],
      loading: false,
      error: null,
    },
  },
  currentUser: {
    token: localStorage.getItem('token'),
    authData: null,
    loading: false,
    error: null,
  },

  currencies: {
    data: null,
    loading: false,
    error: null,
  },
  logout: {
    error: null,
    loading: false,
    message: '',
    success: false,
  },
  userData: {
    data: null,
    loading: false,
    error: null,
  },
  networth: {
    data: null,
    loading: false,
    error: null,
  },
  currencyNetworth: {
    data: null,
    loading: false,
    error: null,
    flag: null,
  },
  transactionHistory: {
    data: null,
    loading: false,
    error: null,
  },
  login: {
    error: null,
    loading: false,
  },
  verifyPhoneNumber: {
    error: null,
    loading: false,
    isValid: false,
    message: '',
  },
  sendOTP: {
    error: null,
    loading: false,
    success: false,
    message: '',
  },
  verifyOTP: {
    error: null,
    loading: false,
    isValid: false,
    message: '',
  },
  verifyPID: {
    error: null,
    loading: false,
    isValid: false,
    message: '',
  },
  registerUser: {
    error: null,
    loading: false,
    success: false,
    message: '',
    Wallets: [
      {
        WalletNumber: '',
        CurrencyCode: '',
        Flag: '',
      },
    ],
    username: '',
  },
  userLocationData: {
    error: null,
    loading: false,
    success: false,
    IPAddress: '',
    ContinentCode: '',
    ContinentName: '',
    CountryCode: '',
    CountryName: '',
    StateProvince: '',
    City: '',
    Flag: '',
    LanguageCode: '',
    LanguageName: '',
    Description: '',
  },
  countryCurrencies: {
    error: null,
    loading: false,
    success: false,
    message: '',
    currencies: [
      {
        CountryCode: '',
        Currency: '',
        Main: '',
        CurrencyFlag: '',
        Flag: '',
      },
    ],
  },
  myWallets: {
    error: null,
    loading: false,
    success: false,
    message: '',
    walletList: [],
  },
  resetPasswordQuestions: {
    loading: false,
    error: null,
    success: false,
    Questions: null,
  },

  resetPasswordPrequalification: {
    error: null,
    loading: false,
    success: false,
  },
  resetPassword: {
    loading: false,
    error: null,
    success: false,
    message: '',
    DOB: '',
    DOBSet: 'No',
  },
  myStores: {
    error: null,
    loading: false,
    success: false,
    message: '',
    storeList: [],
  },
  setStoreStatus: {
    data: null,
    loading: false,
    error: null,
  },
  deleteStore: {
    data: null,
    loading: false,
    error: null,
  },
  createWallet: {
    error: null,
    loading: false,
    success: false,
  },
  deleteWallet: {
    error: null,
    loading: false,
    success: false,
  },
  editWallet: {
    error: null,
    loading: false,
    success: false,
  },
  setAsDefault: {
    error: null,
    loading: false,
    success: false,
  },
  defaultWallet: {
    error: null,
    loading: false,
    data: null,
    success: false,
  },
  currenciesList: {
    data: null,
    loading: false,
    error: null,
  },
  notifications: {
    loading: false,
    error: null,
    success: false,
    data: [],
    meta: null,
  },

  setPresenceStatus: {
    data: null,
    loading: false,
    error: null,
  },
  userIdData: {
    data: null,
    loading: false,
    error: null,
  },
  verifyEmail: {
    error: null,
    loading: false,
    success: false,
    message: '',
    data: null,
  },
};
