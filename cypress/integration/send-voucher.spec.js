const pin = '2580';
const username = 'mwibutsa';
const password = 'Password@1996';

const APIKey = 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq';
const AppID = 'kjcSNdVw2AiMdtDubTJJ1C3Mk';
const LoginName = 'M2U';

const fillAmountField = value => {
  cy.get(
    ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
  ).click();
  cy.get('.visible > .scrolling > :nth-child(1)')
    .last()
    .click();
  cy.get('.form-information > .ui > input').type(
    value || value === 0 ? `${value}` : '1',
  );
};

const submitVoucherForm = () => {
  cy.get('.success-button').click();
};

const RECENT_STORES = [
  {
    StoreID: 'ST-01-DANSON777',
    StoreName: 'Danson Store',
    ShortDesc: 'Danson store',
    Description: '',
    OpeningHour: '00:00',
    ClosingHour: '23:55',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: '7 KG 9 Ave, Kigali, Rwanda',
    Category: '13',
    CategoryCode: '1383',
    CategoryText: 'Hotels',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'Serge Danson',
    AccountNumber: 'RWF-01-DANSON777',
    Currency: 'RWF',
    CurrencyFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    CountryCode: 'rw',
    Flag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '',
    OpenOnWE: '1',
    OpenOnWEText: 'YES',
    TransCount: '0',
    LastOpsDate: '2020-10-13',
    LastOpsAmount: '0.00',
    CreationDate: '2020-10-13',
    TotalTurnOver: '0.00',
    PendingVouchers: '15',
    StoreBanner:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-danson777-0.png',
    StoreLogo:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-danson777logo-0.png',
    Latitude: '-1.950794995256',
    Longitude: '30.101644468787',
  },
  {
    StoreID: 'ST-01-JAMANTHEMAN',
    StoreName: 'Apple shop',
    ShortDesc: 'my awesome shp',
    Description: 'My awesome shop',
    OpeningHour: '00:10',
    ClosingHour: '03:35',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: 'KK 601 St, Kigali, Rwanda',
    Category: '1',
    CategoryCode: '1371',
    CategoryText: 'Beauty Shop',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'jaman dedy',
    AccountNumber: 'XAF-01-JAMANTHEMAN',
    Currency: 'XAF',
    CurrencyFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/xaf.png',
    CountryCode: 'rw',
    Flag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '',
    OpenOnWE: '0',
    OpenOnWEText: 'NO',
    TransCount: '0',
    LastOpsDate: '2020-10-23',
    LastOpsAmount: '0.00',
    CreationDate: '2020-10-23',
    TotalTurnOver: '0.00',
    PendingVouchers: '0',
    StoreBanner:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-jamantheman-0.png',
    StoreLogo:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-jamanthemanlogo-0.png',
    Latitude: '-1.983260603684',
    Longitude: '30.101558638098',
  },
  {
    StoreID: 'ST-02-JAMANTHEMAN',
    StoreName: 'Apple shop',
    ShortDesc: 'my awesome shp',
    Description: 'My awesome shop',
    OpeningHour: '00:10',
    ClosingHour: '03:35',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: 'KK 601 St, Kigali, Rwanda',
    Category: '1',
    CategoryCode: '1371',
    CategoryText: 'Beauty Shop',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'jaman dedy',
    AccountNumber: 'XAF-01-JAMANTHEMAN',
    Currency: 'XAF',
    CurrencyFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/xaf.png',
    CountryCode: 'rw',
    Flag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '',
    OpenOnWE: '0',
    OpenOnWEText: 'NO',
    TransCount: '0',
    LastOpsDate: '2020-10-23',
    LastOpsAmount: '0.00',
    CreationDate: '2020-10-23',
    TotalTurnOver: '0.00',
    PendingVouchers: '0',
    StoreBanner:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-02-jamantheman-0.png',
    StoreLogo:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-02-jamanthemanlogo-0.png',
    Latitude: '-1.983260603684',
    Longitude: '30.101558638098',
  },
  {
    StoreID: 'ST-01-NGABO',
    StoreName: 'ABC SHOP',
    ShortDesc: 'ABC SHOP',
    Description: 'ABC SHOP',
    OpeningHour: '00:05',
    ClosingHour: '01:15',
    Likes: '0',
    DisLikes: '0',
    RatingCount: '0',
    Rating: '0',
    AverageRating: '0',
    Status: '1',
    StatusCode: '341',
    StatusText: 'Active',
    Address: 'KK 16 St, Kigali, Rwanda',
    Category: '2',
    CategoryCode: '1372',
    CategoryText: 'Coffee Shop',
    City: 'Kigali',
    Country: 'Rwanda',
    Owner: 'Ngabo Jasper',
    AccountNumber: 'EUR-01-NGABO',
    Currency: 'EUR',
    CurrencyFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/eur.png',
    CountryCode: 'rw',
    Flag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    PhoneNumber: '250788867447',
    OpenOnWE: '0',
    OpenOnWEText: 'NO',
    TransCount: '0',
    LastOpsDate: '2020-10-12',
    LastOpsAmount: '0.00',
    CreationDate: '2020-10-12',
    TotalTurnOver: '0.00',
    PendingVouchers: '1',
    StoreBanner:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-ngabo-0.png',
    StoreLogo:
      'https://m2umoneypicfiles.blob.core.windows.net/medias/st-01-ngabologo-0.png',
    Latitude: '-1.962157418749',
    Longitude: '30.140977313708',
  },
];

const CONTACT_LIST = [
  {
    ContactType: 'INTERNAL',
    ContactPID: 'NGIRIMANA',
    FirstName: 'Ngirimana',
    LastName: 'Schadrack',
    PresenceStatus: '0',
    AccountVerified: 'NO',
    PictureURL:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/ngirimana-0.png',
    PictureURLmedium:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/ngirimanamedium-0.png',
    PictureURLsmall:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/ngirimanasmall-0.png',
    CountryCode: 'AX',
    PhoneNumber: '250781475108',
    MainPhonePrefix: '250',
    MainPhoneNumber: '781 475 108',
    MainPhoneFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
    Phones: [
      {
        Phone: '250781475108',
        PhonePrefix: '250',
        PhoneNumber: '781 475 108',
        NumberCountryCode: 'AX',
        PhoneFlag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
        Category: 'Private',
        CategoryCode: '1',
      },
    ],
    EMail: 'ngirischad@gmail.com',
    DefaultWallet: {
      WalletNumber: 'XAF-01-NGIRIMANA',
      WalletName: 'Personal',
      Currency: 'XAF',
      Flag:
        'https://m2umoneypicfiles.blob.core.windows.net/icons/xaf.png',
    },
    Favorite: 'NO',
    MySharedWalletsCount: '2',
    MySharedWallets: [
      {
        WalletNumber: 'BTC-01-MWIBUTSA',
        WalletName: 'The Bit Ocean',
        Currency: 'BTC',
        Balance: '17 BTC',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/btc.png',
      },
      {
        WalletNumber: 'USD-01-MWIBUTSA',
        WalletName: 'The Greatest of all!',
        Currency: 'USD',
        Balance: '12,524 USD',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
      },
    ],
    BankAccountCount: '0',
    BankAccounts: [],
  },
  {
    ContactType: 'INTERNAL',
    ContactPID: 'TRAVEL',
    FirstName: 'Izere',
    LastName: 'Yves Travel',
    PresenceStatus: '4',
    AccountVerified: 'NO',
    PictureURL:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/travel-0.png',
    PictureURLmedium:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/travelmedium-0.png',
    PictureURLsmall:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/travelsmall-0.png',
    CountryCode: 'AX',
    PhoneNumber: '250781475108',
    MainPhonePrefix: '250',
    MainPhoneNumber: '781 475 108',
    MainPhoneFlag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
    Phones: [
      {
        Phone: '250786341441',
        PhonePrefix: '250',
        PhoneNumber: '786 341 441',
        NumberCountryCode: 'AX',
        PhoneFlag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
        Category: 'Private',
        CategoryCode: '1',
      },
    ],
    EMail: 'ngirischad@gmail.com',
    DefaultWallet: {
      WalletNumber: 'XAF-01-NGIRIMANA',
      WalletName: 'Personal',
      Currency: 'XAF',
      Flag:
        'https://m2umoneypicfiles.blob.core.windows.net/icons/xaf.png',
    },
    WalletsCount: '2',
    Wallets: [
      {
        WalletNumber: 'BTC-01-TRAVEL',
        WalletName: 'Bit coin',
        Currency: 'BTC',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/btc.png',
      },
      {
        WalletNumber: 'USD-01-TRAVEL',
        WalletName: 'Us of All',
        Currency: 'USD',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
      },
    ],
    Favorite: 'NO',
    MySharedWalletsCount: '2',
    MySharedWallets: [
      {
        WalletNumber: 'BTC-01-MWIBUTSA',
        WalletName: 'The Bit Ocean',
        Currency: 'BTC',
        Balance: '17 BTC',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/btc.png',
      },
      {
        WalletNumber: 'USD-01-MWIBUTSA',
        WalletName: 'The Greatest of all!',
        Currency: 'USD',
        Balance: '12,524 USD',
        Flag:
          'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
      },
    ],
    BankAccountCount: '0',
    BankAccounts: [],
  },
  {
    ContactType: 'EXTERNAL',
    Favorite: 'NO',
    FirstName: 'Dusenabo',
    LastName: 'Aline',
    CountryCode: 'RW',
    PhonePrefix: '250',
    Phone: '780 566 053',
    PhoneNumber: '250780566053',
    PictureURL:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/250780566053-0.png',
    PictureURLmedium:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/250780566053medium-0.png',
    PictureURLsmall:
      'https://m2umoneypicfiles.blob.core.windows.net/zones/250780566053small-0.png',
    Currency: '',
    Flag:
      'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
    BankAccountCount: '0',
    BankAccounts: [],
  },
];

const mockSearchStore = (
  response = [
    {
      StoreID: 'ST-20-AGO',
      StoreName: 'Web store',
      ShortDesc: 'Join us',
      Description: 'THis is the full description',
      OpeningHour: '05:00',
      ClosingHour: '19:00',
      Likes: '0',
      DisLikes: '0',
      RatingCount: '100',
      Rating: '97',
      AverageRating: '0.970',
      Status: '1',
      StatusCode: '341',
      StatusText: 'Active',
      Address: 'ON cloud',
      Category: '4',
      CategoryCode: '1374',
      CategoryText: 'Culture Center',
      City: 'Kigali',
      Country: 'Rwanda',
      Owner: 'Alberto Olympio',
      AccountNumber: 'AED-50-AGO',
      Currency: 'AED',
      CurrencyFlag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/ae.png',
      CountryCode: 'rw',
      Flag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      PhoneNumber: '987654',
      OpenOnWE: '1',
      OpenOnWEText: 'YES',
      TransCount: '0',
      LastOpsDate: '2020-03-26',
      LastOpsAmount: '0.00',
      CreationDate: '2020-03-26',
      TotalTurnOver: '0.00',
      PendingVouchers: '83',
      StoreBanner:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-20-ago-0.png',
      StoreLogo:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-20-agologo-0.png',
      Latitude: '-1.9529728',
      Longitude: '30.1006848',
    },
    {
      StoreID: 'ST-25-AGO',
      StoreName: 'DHS AGO Store',
      ShortDesc: 'DHS AGO Store',
      Description: 'DHS AGO Store',
      OpeningHour: '00:00',
      ClosingHour: '00:05',
      Likes: '106',
      DisLikes: '59',
      RatingCount: '1,030',
      Rating: '269',
      AverageRating: '0.261',
      Status: '1',
      StatusCode: '341',
      StatusText: 'Active',
      Address: 'My house',
      Category: '0',
      CategoryCode: '1370',
      CategoryText: 'Bakery',
      City: 'Kigali',
      Country: 'Rwanda',
      Owner: 'Alberto Olympio',
      AccountNumber: 'GHS-03-AGO',
      Currency: 'GHS',
      CurrencyFlag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/gh.png',
      CountryCode: 'rw',
      Flag:
        'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      PhoneNumber: '',
      OpenOnWE: '1',
      OpenOnWEText: 'YES',
      TransCount: '0',
      LastOpsDate: '2020-03-26',
      LastOpsAmount: '0.00',
      CreationDate: '2020-03-26',
      TotalTurnOver: '0.00',
      PendingVouchers: '33',
      StoreBanner:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-25-ago-0.png',
      StoreLogo:
        'https://celinemoneypicfiles.blob.core.windows.net/medias/st-25-agologo-0.png',
      Latitude: '-1.9529728',
      Longitude: '30.1006848',
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/SearchStore',
    status,
    response,
  }).as('searchStore');
};
const mockConfirmTransfer = (
  response = [
    {
      OK: '200',
      TargetAccountVerified: 'YES',
      AccountName: '',
      AccountCurrency: '',
      Description:
        'Funds are available. All clear for this transaction.',
      Result: 'Success',
      AmountToBeSent: '0.01 EUR',
      Amount: '12.00 RWF',
      Fees: '0.00 RWF',
      ExternalFees: '0.00 RWF',
      ExchangeFees: '0.08 RWF',
      Taxes: '0.00 RWF',
      TotalAmount: '12.09 RWF',
      ExchangeRate: '1:0.000980',
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status,
    response,
  }).as('transferConfirmation');
};

const mockSendVoucher = (
  response = [
    {
      OK: '200',
      Description:
        'Funds sent and the wallets are updated. Notification is sent to all parties.',
      Result: 'Success',
      AmountSent: '11984.72 RWF',
      Amount: '12.00 EUR',
      Fees: '0.00 EUR',
      ExternalFees: '0.00 EUR',
      ExchangeFees: '0.08 EUR',
      Taxes: '0.00 EUR',
      TotalAmount: '12.09 EUR',
      ExchangeRate: '1:998.726990',
      TransferNumber: '61 87 61 97 63',
      SecurityCode: '05 02',
      VoucherQRCode:
        'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=61876197630502',
      SourceWallet: {
        WalletNumber: 'EUR-01-FLORIBERT',
        Balance: '815.039672851562',
        WalletName: 'Personal',
        Currency: 'EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
      },
    },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    status,
    response,
    url: '/SendVoucher',
  }).as('sendVoucher');
};
const openStoreMenu = () => {
  cy.get(
    ':nth-child(1) > :nth-child(3) > .icons > .floating > .ellipsis',
  ).click();

  cy.get(
    '.active > .menu > :nth-child(2) > .icon-image > .itemName',
  ).click();
};
const mockGetContactList = () => {
  cy.route({
    method: 'POST',
    url: '/GetAllContactList',
    status: 200,
    data: {
      APIKey,
      AppID,
      LoginName,
    },
    response: CONTACT_LIST,
  }).as('getContactList');
};
const mockGetRecentStores = () => {
  cy.route({
    method: 'POST',
    url: '/GetRecentStoreList',
    data: {
      APIKey,
      AppID,
      LoginName,
    },
    status: 200,
    response: RECENT_STORES,
  }).as('getRecentStores');
};

const selectContact = () => {
  cy.get('.contact-list > :nth-child(1) > :nth-child(1)').click();
};

const selectInternalContact = () => {
  cy.get('.contact-list > :nth-child(3) > :nth-child(1)')
    .last()
    .click();
};

const fillDetailsForm = () => {
  cy.get('input[name="reference"]', { timeout: 60000 }).type(
    'Test send voucher',
  );
  cy.get('input[name="description"]', { timeout: 60000 }).type(
    'Test send voucher.',
  );
};

const submitDetailsForm = () => {
  cy.get('.success-button').click();
};

const mockGetStoreCategories = (
  response = [
    { Category: '0', CategoryName: 'Bakery' },
    { Category: '1', CategoryName: 'Beauty Shop' },
    { Category: '2', CategoryName: 'Coffee Shop' },
  ],
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/GetStoreCategoryList',
    response,
    status,
  }).as('getStoreCategories');
};
const mockGetWalletList = () => {
  cy.route({
    method: 'POST',
    url: '/GetUserWalletList',
    status: 200,
    response: [
      {
        AccountNumber: 'BTC-01-FLORIBERT',
        AccountName: 'Bit Balance',
        WalletQRCode:
          'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=BTC-01-FLORIBERT',
        Balance: '499,998.03',
        CurrencyCode: 'BTC',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
        Default: 'NO',
        HasACreditCard: 'NO',
      },
      {
        AccountNumber: 'EUR-01-FLORIBERT',
        AccountName: 'Personal',
        WalletQRCode:
          'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=EUR-01-FLORIBERT',
        Balance: '827.13',
        CurrencyCode: 'EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
        Default: 'NO',
        HasACreditCard: 'NO',
      },
      {
        AccountNumber: 'RWF-01-FLORIBERT',
        AccountName: 'The Greatest of all!',
        WalletQRCode:
          'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-FLORIBERT',
        Balance: '12,217,518.00',
        CurrencyCode: 'RWF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
        Default: 'YES',
        HasACreditCard: 'NO',
      },
      {
        AccountNumber: 'USD-01-FLORIBERT',
        AccountName: 'Personal',
        WalletQRCode:
          'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=USD-01-FLORIBERT',
        Balance: '323.77',
        CurrencyCode: 'USD',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
        Default: 'NO',
        HasACreditCard: 'NO',
      },
    ],
  }).as('getUserWallet');
};
describe('TEST SEND VOUCHER', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs(username, password, pin);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.server();
    cy.restoreLocalStorage();
    mockGetRecentStores();
    mockGetContactList();
    mockGetStoreCategories();
    mockGetWalletList();
    cy.visit('/contacts?ref=send-voucher');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should send voucher to an external contact.', () => {
    cy.wait('@getContactList');
    cy.location('pathname').should('eq', '/contacts');
    cy.get('.contact-list .nametext').should(
      'have.length.greaterThan',
      1,
    );
    selectContact();
    cy.wait('@getRecentStores');

    cy.get('.voucher-stores__items__item__details').should(
      'have.length.greaterThan',
      1,
    );

    cy.location('pathname').should('eq', '/vouchers');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin(pin);
    mockSendVoucher();
    submitDetailsForm();
    cy.wait('@transferConfirmation');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('should not send voucher with zero amount of money.', () => {
    cy.wait('@getContactList');
    selectContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField(0);
    submitVoucherForm();
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'The amount cannot be zero',
    );
  });

  it('should not send voucher with amount greater than wallet balance.', () => {
    cy.wait('@getContactList');
    selectContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField(9289192);
    mockConfirmTransfer(
      [
        {
          Error: '2022',
          Description:
            'You do not have enough money in this wallet for this operation',
          Result: 'FAILED',
        },
      ],
      401,
    );
    submitVoucherForm();
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'You do not have enough money in this wallet for this operation',
    );
  });

  it('should send voucher to an internal contact', () => {
    cy.wait('@getContactList');
    selectInternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin(pin);
    mockSendVoucher();
    submitDetailsForm();
    cy.wait('@transferConfirmation');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should not send voucher without a PIN', () => {
    cy.wait('@getContactList');
    selectInternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    mockSendVoucher(
      [
        {
          Error: '2022',
          Description: 'Please enter your 4 digit PIN Number',
          Result: 'FAILED',
        },
      ],
      401,
    );
    submitDetailsForm();
    cy.get('.ss-content').should('be.visible');
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please enter your 4 digit PIN Number',
    );
  });

  it('should not send voucher with wrong PIN', () => {
    cy.wait('@getContactList');
    selectInternalContact();
    cy.wait('@getRecentStores');
    openStoreMenu();
    fillAmountField();
    mockConfirmTransfer();
    submitVoucherForm();
    fillDetailsForm();
    cy.enterPin('1000');
    mockSendVoucher(
      [
        {
          Error: '2022',
          Description: 'Wrong PIN',
          Result: 'FAILED',
        },
      ],
      401,
    );
    submitDetailsForm();
    cy.get('.ss-content').should('be.visible');
    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Wrong PIN',
    );
  });

  it('should be able to search through stores', () => {
    cy.wait('@getContactList');
    selectInternalContact();
    mockSearchStore();
    cy.get(
      ':nth-child(1) > :nth-child(2) > .field > .ui > input',
    ).type('Kigali');
    cy.get(
      '.form-compo2 > :nth-child(2) > .field > .ui > input',
    ).type('Web store');
    cy.get(
      '.ui.form-compo > :nth-child(2) > :nth-child(1) > .ui',
    ).click();

    cy.get(
      ':nth-child(1) > .VoucherStores > .fluid > .content',
    ).should('have.length', 1);
  });

  it('should notify the user if no stores were found matching search criteria', () => {
    cy.wait('@getContactList');
    selectInternalContact();
    mockSearchStore([
      {
        OK: '200',
        Description: 'No Store found.',
        StoreFound: 'No',
        Result: 'Success',
      },
    ]);
    cy.get(
      ':nth-child(1) > :nth-child(2) > .field > .ui > input',
    ).type('xxxxxxx');
    cy.get(
      '.form-compo2 > :nth-child(2) > .field > .ui > input',
    ).type('!NoThing!');
    cy.get('.icon-form-el > .ui > .dropdown').click();
    cy.get('.ui > .visible > :nth-child(2)').click();
    cy.get(
      '.ui.form-compo > :nth-child(2) > :nth-child(1) > .ui',
    ).click();

    cy.get('.message-component > span').should(
      'contain.text',
      'The search returns no result',
    );
  });
});
