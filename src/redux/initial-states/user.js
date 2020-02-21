export default {
  currentUser: {
    isAuthenticated: !!localStorage.token,
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
    CountryCode: 'rw',
    CountryName: 'Rwanda',
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
  },
};
