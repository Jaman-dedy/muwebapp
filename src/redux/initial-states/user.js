export default {
  currentUser: {
    isAuthenticated: !!localStorage.token,
    data: {
      OK: '200',
      Description: 'User details found',
      UserLoginCorrect: 'TRUE',
      FirstName: 'Danson',
      LastName: 'Serge',
      DefaultWallet: 'RWF-01-DANSON777',
      Balance: '20,000.00',
      Currency: 'RWF',
      Country: 'RW',
      WalletQRCode:
        'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-DANSON777',
      Flag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      PicURL:
        'https://celinemoneypicfiles.blob.core.windows.net/zones/DANSON777.png',
      Result: 'Success',
    },
    loading: false,
    error: null,
  },
  login: {
    error: null,
    loading: false,
  },
  usersList: {
    error: null,
    loading: false,
    data: [],
    message: '',
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
