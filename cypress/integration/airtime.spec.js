/* eslint-disable no-undef */
const pin = '1122';
const username = 'DANSON777';
const password = 'Danson2020@';

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

const mockBuyAirtime = error => {
  cy.route({
    method: 'POST',
    url: '/TransferToOther',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2014',
            Description: 'Wrong PIN number',
            UserLoginCorrect: 'FALSE',
          },
        ]
      : [
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
      expect(loc.toString()).to.eq(
        'http://localhost:3000/contacts?ref=to-up',
      );
    });
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('it should send AIRTIME to a contact', () => {
    cy.visit('/contacts?ref=to-up');
    // showAmountForm();
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
    cy.visit('/contacts?ref=to-up');
  });

  xit('Should not submit if no provider selected', () => {
    showAmountForm();
    fillAmountField(100);

    submitAmountForm();
    cy.get('.message-component').should(
      'contain',
      'You must select a provider for this operation',
    );
  });

  xit('Should not submit if no amount provided', () => {
    showAmountForm();
    cy.get('.currency > .dropdown').click();
    cy.get(
      '.visible > .scrolling > :nth-child(1) > .dropdown-trigger',
    ).click();

    submitAmountForm();
    cy.get('.message-component > span').should(
      'contain',
      'You must enter the amount for this operation',
    );
  });

  xit('Should not submit without a PIN', () => {
    showAmountForm();

    cy.get('.currency > .dropdown', { timeout: 30000 }).click();
    cy.get(
      '.visible > .scrolling > :nth-child(1) > .dropdown-trigger',
      { timeout: 40000 },
    ).click();

    fillAmountField(10);
    mockTransferConfirmation();
    submitAmountForm();
    mockBuyAirtime();
    cy.get('.positive').click();
    cy.get('.message-component > span').should(
      'contain',
      'Please provide your PIN number',
    );
  });
});
