/* eslint-disable no-undef */
const pin = '1122';
const username = 'DANSON777';
const password = 'Danson2020@';

const voucherNumberFake = '1127806643';
const securityCodeFake = '7707';

const DATA = {
  APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
  AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
  LoginName: '2UDev',
};

const mockGetAllWallets = () => {
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
};

const mockGetAllContacts = () => {
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
  }).as('getAllContacts');
};

describe('Test Redeem Voucher', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.loginAs(username, password, pin);
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.server();
    mockGetAllContacts();
    mockGetAllWallets();

    cy.restoreLocalStorage();
    cy.visit('/');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });
  it('Should go to home page', () => {
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/');
    });
  });
  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });
  it('Should open the redeem voucher modal from the home page', () => {
    cy.get('.to-u-services > :nth-child(10)').click();
    cy.get('.mini > .content').should('be.visible');
  });
  it('Should not proceed when Security code is not provided', () => {
    cy.get('.to-u-services > :nth-child(10)').click();
    cy.get('.form > .field > .ui > input').type(voucherNumberFake);
    cy.get('.positive').click();
    cy.get('.Toastify__toast').should('be.visible');
  });
  it('Should not proceed when Voucher number is not provided', () => {
    cy.get('.to-u-services > :nth-child(10)').click();
    cy.get('input[name="digit0"]').type(securityCodeFake[0]);
    cy.get('input[name="digit1"]').type(securityCodeFake[1]);
    cy.get('input[name="digit2"]').type(securityCodeFake[2]);
    cy.get('input[name="digit3"]').type(securityCodeFake[3]);

    cy.get('.positive').click();
    cy.get('.Toastify__toast').should('be.visible');
  });
  it('Should alert an error when wrong voucher number and security code are provided', () => {
    cy.get('.to-u-services > :nth-child(10)').click();
    cy.get('.form > .field > .ui > input').type(voucherNumberFake);
    cy.get('input[name="digit0"]').type(securityCodeFake[0]);
    cy.get('input[name="digit1"]').type(securityCodeFake[1]);
    cy.get('input[name="digit2"]').type(securityCodeFake[2]);
    cy.get('input[name="digit3"]').type(securityCodeFake[3]);

    cy.get('.positive').click();
    cy.get('.Toastify__toast').should('be.visible');
  });
  it('Should open the redeem voucher modal from my stores page', () => {
    cy.visit('/my-stores');
    cy.get('.head-buttons > :nth-child(1)').click({ force: true });
    cy.get('.mini > .content').should('be.visible');
  });

});
