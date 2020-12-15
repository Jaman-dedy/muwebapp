/* eslint-disable no-undef */
const pin = '1122';
const username = 'DANSON777';
const password = 'Danson2020@';

const baseUrl = window.location.origin;

const CONFIRMATION_DATA = {
  LoginName: '2UDev',
  APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
  Amount: '1',
  AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
  CountryCode: 'RW',
  SourceWallet: 'RWF-01-LAFOUINEBABY',
  TargetCurrency: 'RWF',
  TargetType: '1',
};

const DATA = {
  APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
  AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
  LoginName: '2UDev',
};

const fillAmountField = value => {
  cy.get(
    ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
  ).click();
  cy.get('.visible > .scrolling > :nth-child(1)')
    .first()
    .click();

  cy.get('input[name="amount"]', { timeout: 3000 }).type(`${value}`);
};

const submitAmountForm = () => {
  cy.get('.actions button.ui.positive.button').click();
};

const mockTransferConfirmation = error => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2022',
            Description:
              'You do not have enough money in this wallet for this operation(24916158)',
            Result: 'FAILED',
          },
        ]
      : [
          {
            OK: '200',
            TargetAccountVerified: 'YES',
            AccountName: '',
            AccountCurrency: '',
            Description:
              'Funds are available. All clear for this transaction.',
            Result: 'Success',
            AmountToBeSent: '1.00 RWF',
            Amount: '1.00 RWF',
            Fees: '0.00 RWF',
            ExternalFees: '0.00 RWF',
            ExchangeFees: '0.00 RWF',
            Taxes: '0.00 RWF',
            TotalAmount: '1.00 RWF',
            ExchangeRate: '1:1.000000',
          },
        ],
  }).as('confirmTransaction');
};

//Mock getMNOList
const mockGetCountries = () => {
  cy.route({
    method: 'POST',
    url: '/MNOCountryList',
    data: DATA,
    status: 200,
    response: [
      {
        CountryCode: 'BJ',
        CountryName: 'Benin',
        PhoneAreaCode: '229',
        Currency: 'XOF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/bj.png',
      },
      {
        CountryCode: 'CI',
        CountryName: "Côte d'Ivoire",
        PhoneAreaCode: '225',
        Currency: 'XOF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/ci.png',
      },
      {
        CountryCode: 'CM',
        CountryName: 'Cameroon',
        PhoneAreaCode: '237',
        Currency: 'XAF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/cm.png',
      },
      {
        CountryCode: 'FR',
        CountryName: 'France',
        PhoneAreaCode: '33',
        Currency: 'EUR',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/fr.png',
      },
      {
        CountryCode: 'RW',
        CountryName: 'Rwanda',
        PhoneAreaCode: '250',
        Currency: 'RWF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'SN',
        CountryName: 'Senegal',
        PhoneAreaCode: '221',
        Currency: 'XOF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/sn.png',
      },
      {
        CountryCode: 'TG',
        CountryName: 'Togo',
        PhoneAreaCode: '228',
        Currency: 'XOF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/tg.png',
      },
      {
        CountryCode: 'US',
        CountryName: 'United States',
        PhoneAreaCode: '1',
        Currency: 'USD',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
      },
    ],
  });
};

const mockGetProviders = () => {
  cy.route({
    method: 'POST',
    url: '/MNOList',
    data: DATA,
    status: 200,
    response: [
      {
        CountryCode: 'RW',
        OperatorID: '63510',
        OperatorName: 'MTN Rwanda',
        Category: '21',
        LogoNumber: '1',
        AccountPattern: '###-###-###',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/001.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      {
        CountryCode: 'RW',
        OperatorID: '63514',
        OperatorName: 'Airtel Rwanda',
        Category: '21',
        LogoNumber: '3',
        AccountPattern: '###-###-###',
        Logo:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/003.png',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
    ],
  });
};

const mockBuyAirtime = () => {
  cy.route({
    method: 'POST',
    url: '/TransferToOther',
    status: 200,
    response: [
      {
        OK: '200',
        Description:
          'Transfer from wallet RWF-02-LAFOUINEBABY (2UMoney)',
        Result: 'Success',
        AmountToBeSent: '0.00 AED',
        Amount: '100.00 RWF',
        Fees: '2500.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '0.68 RWF',
        Taxes: '125.13 RWF',
        TotalAmount: '2725.81 RWF',
        ExchangeRate: '1:0.000000',
        WalletData: {
          SourceWallet: 'RWF-02-LAFOUINEBABY',
          Currency: 'RWF',
          Balance: '893248.94 RWF',
        },
      },
    ],
  }).as('buyAirtime');
};
// Opens transfer amount form and populates the amount field if a value is provided
const showAmountForm = () => {
  // open buy airtime modal
  cy.get('div.contact-item', { timeout: 20000 })
    .last()
    .click();

  cy.get(
    ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
    { timeout: 20000 },
  ).click();
  cy.get(
    '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
    { timeout: 40000 },
  ).click();
};

describe('Test Buying Airtime', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs(username, password, pin);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/GetUserWalletList',
      data: DATA,
      status: 200,
      response: [
        {
          AccountNumber: 'BTC-01-LAFOUINEBABY',
          AccountName: 'Bit Balance',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=BTC-01-LAFOUINEBABY',
          Balance: '499,998.03',
          CurrencyCode: 'BTC',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'EUR-01-LAFOUINEBABY',
          AccountName: 'Personal',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=EUR-01-LAFOUINEBABY',
          Balance: '827.13',
          CurrencyCode: 'EUR',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'RWF-01-LAFOUINEBABY',
          AccountName: 'The Greatest of all!',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-LAFOUINEBABY',
          Balance: '12,217,518.00',
          CurrencyCode: 'RWF',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          Default: 'YES',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'USD-01-LAFOUINEBABY',
          AccountName: 'Personal',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=USD-01-LAFOUINEBABY',
          Balance: '323.77',
          CurrencyCode: 'USD',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
      ],
    }).as('getUserWallet');

    cy.route({
      method: 'POST',
      url: '/GetAllContactList',
      data: DATA,
      status: 200,
      response: [
        {
          ContactType: 'INTERNAL',
          ContactPID: 'AGO',
          FirstName: 'Alberto Gerardo',
          LastName: 'Olympio',
          PresenceStatus: '0',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/ago-4.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/agomedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/agosmall-0.png',
          CountryCode: 'SN',
          PhoneNumber: '221777979343',
          MainPhonePrefix: '221',
          MainPhoneNumber: '77 797 93 43',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/sn.png',
          Phones: [
            {
              Phone: '221777979343',
              PhonePrefix: '221',
              PhoneNumber: '77 797 93 43',
              NumberCountryCode: 'SN',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/sn.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'alberto@ossix.technology',
          DefaultWallet: {
            WalletNumber: 'USD-01-AGO',
            WalletName:
              'Investments in the cloud bor are good you broke me first',
            Currency: 'USD',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
          },
          WalletsCount: '3',
          Wallets: [
            {
              WalletNumber: 'EUR-01-AGO',
              WalletName: 'Operations',
              Currency: 'EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-AGO',
              WalletName: 'Rwanda Op',
              Currency: 'RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-AGO',
              WalletName:
                'Investments in the cloud bor are good you broke me first',
              Currency: 'USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '827 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,217,518 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'USD',
              Balance: '324 USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'INTERNAL',
          ContactPID: 'MWIBUTSA',
          FirstName: 'Mwibutsa',
          LastName: 'Floribert',
          PresenceStatus: '0',
          AccountVerified: 'NO',
          PictureURL:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsa-0.png',
          PictureURLmedium:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsamedium-0.png',
          PictureURLsmall:
            'https://celinemoneypicfiles.blob.core.windows.net/zones/mwibutsasmall-0.png',
          CountryCode: 'RW',
          PhoneNumber: '2500787740316',
          MainPhonePrefix: '250',
          MainPhoneNumber: '078 774 0316',
          MainPhoneFlag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          Phones: [
            {
              Phone: '2500787740316',
              PhonePrefix: '250',
              PhoneNumber: '078 774 0316',
              NumberCountryCode: 'RW',
              PhoneFlag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: 'floribert.mwibutsa@gmail.com',
          DefaultWallet: {
            WalletNumber: 'RWF-01-MWIBUTSA',
            WalletName: 'Personal',
            Currency: 'RWF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
          },
          WalletsCount: '3',
          Wallets: [
            {
              WalletNumber: 'EUR-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-MWIBUTSA',
              WalletName: 'Personal',
              Currency: 'USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '827 EUR',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-FLORIBERT',
              WalletName: 'The Greatest of all!',
              Currency: 'RWF',
              Balance: '12,217,518 RWF',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-FLORIBERT',
              WalletName: 'Personal',
              Currency: 'USD',
              Balance: '324 USD',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
      ],
    });
    cy.restoreLocalStorage();
    cy.visit('/contacts?ref=to-up');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should go to the the top up page', () => {
    cy.location().should(loc => {
      expect(loc.toString()).to.eq(`${baseUrl}/contacts?ref=to-up`);
    });
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('Should check if there is no Airtime provider', () => {
    cy.visit('/contacts?ref=to-up');

    cy.get('div.contact-item')
      .last()
      .click();
    cy.get(
      ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
      { timeout: 10000 },
    ).click();
    cy.get(
      '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
      { timeout: 10000 },
    ).click();
    cy.get('.ui > p').should('contain', 'No providers yet');
  });

  it('it should send AIRTIME to a contact', () => {
    mockGetCountries();
    mockGetProviders();
    cy.visit('/contacts?ref=to-up');

    cy.get('div.contact-item')
      .last()
      .click();
    cy.get(
      ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
      { timeout: 10000 },
    ).click();
    cy.get(
      '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
      { timeout: 10000 },
    ).click();
    cy.get('.currency > .dropdown').click();
    cy.get(
      '.visible > .scrolling > :nth-child(1) > .dropdown-trigger',
    ).click();
    fillAmountField(100);
    mockTransferConfirmation();
    submitAmountForm();
    cy.enterPin(pin);
    mockBuyAirtime();
    cy.get('.positive').click();
    //cy.get('.Toastify__toast').should('exist');

    cy.location().should(loc => {
      expect(loc.toString()).to.eq(`${baseUrl}/contacts?ref=to-up`);
    });
  });

  it('Should not submit if no provider selected', () => {
    mockGetCountries();
    mockGetProviders();
    cy.visit('/contacts?ref=to-up');

    cy.get('div.contact-item')
      .last()
      .click();
    cy.get(
      ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
      { timeout: 10000 },
    ).click();
    cy.get(
      '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
      { timeout: 10000 },
    ).click();

    fillAmountField(100);
    mockTransferConfirmation();
    submitAmountForm();

    cy.get('.message-component').should(
      'contain',
      'You must select a provider for this operation',
    );
  });

  it('Should not submit if no amount provided', () => {
    mockGetCountries();
    mockGetProviders();
    cy.visit('/contacts?ref=to-up');

    cy.get('div.contact-item')
      .last()
      .click();
    cy.get(
      ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
      { timeout: 10000 },
    ).click();
    cy.get(
      '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
      { timeout: 10000 },
    ).click();
    cy.get('.currency > .dropdown').click();
    cy.get(
      '.visible > .scrolling > :nth-child(1) > .dropdown-trigger',
    ).click();

    mockTransferConfirmation();
    submitAmountForm();

    cy.get('.message-component > span').should(
      'contain',
      'You must enter the amount for this operation',
    );
  });

  it('Should not submit without a PIN', () => {
    mockGetCountries();
    mockGetProviders();
    cy.visit('/contacts?ref=to-up');
    cy.get('div.contact-item')
      .last()
      .click();
    cy.get(
      ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
      { timeout: 10000 },
    ).click();
    cy.get(
      '.visible > .scrolling > :nth-child(3) > .dropdown-trigger',
      { timeout: 10000 },
    ).click();
    cy.get('.currency > .dropdown').click();
    cy.get(
      '.visible > .scrolling > :nth-child(1) > .dropdown-trigger',
    ).click();
    fillAmountField(100);
    mockTransferConfirmation();
    submitAmountForm();

    cy.get('.positive').click();
    cy.get('.message-component > span').should(
      'contain',
      'Please provide your PIN number',
    );
  });
});
