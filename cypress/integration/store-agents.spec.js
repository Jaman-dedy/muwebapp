/* eslint-disable no-undef */
const pin = '1122';
const username = 'DANSON777';
const password = 'Danson2020@';

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

describe('Test Manage Store Agents', () => {
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
    cy.visit('/my-stores');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Should go to my stores page', () => {
    cy.location().should(loc => {
      expect(loc.pathname).to.eq('/my-stores');
    });
  });
  it('Should go to a store page', () => {
    cy.get('.my-store-list > :nth-child(1)').click();

    cy.location().should(loc => {
      expect(loc.toString()).to.eq(
        'http://localhost:3000/store-details?tab=details',
      );
    });
  });
  it('Should select the agent tab', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();

    cy.location().should(loc => {
      expect(loc.toString()).to.eq(
        'http://localhost:3000/store-details?tab=agents',
      );
    });
  });
  it('Should open the add agent form', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();

    cy.get('.head-buttons > button').click({ force: true });

    cy.get('.small').should('be.visible');
  });
  it('Should search for an agent', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();

    cy.get('.head-buttons > button').click({ force: true });

    cy.get('.right > input').type('AO');
    cy.get('.right > .ui').click();
    cy.get('.results').should('be.visible');
  });
  it('Should indicate if user doent exist', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();

    cy.get('.head-buttons > button').click();

    cy.get('.right > input').type('AOE');
    cy.get('.right > .ui').click();
    cy.get('.error').should('be.visible');
  });
  it('Should add an agent', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();
    cy.get('.head-buttons > button').click();
    cy.get('.right > input').type('AO');
    cy.get('.right > .ui').click();
    cy.get('.actions > .positive').click();
    cy.get('.Toastify__toast', {timeout: 3000 }).should('be.visible');
  });
  it('Should indicate if user is already an agent of that store', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();
    cy.get('.head-buttons > button').click();
    cy.get('.right > input').type('AO');
    cy.get('.right > .ui').click();
    cy.get('.error').should('be.visible');
    
  });
  it('Should remove agent from the store', () => {
    cy.get('.my-store-list > :nth-child(1)').click();
    cy.get('.fluid > :nth-child(4)').click();
    cy.get('.search-area > .ui > input').type('AO');
    cy.get('.trash').click();
    cy.get('.green').click();
    cy.get('.Toastify__toast').should('be.visible');
  });
});
