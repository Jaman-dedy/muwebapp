/* eslint-disable no-undef */
const pin = '1122';
const username = 'SAMB';
const password = 'Ihave1PC!';

const showExchangeForm = (walletNumber = 3) => {
  cy.get('.sidebar-submenu > ul > :nth-child(5)').click({
    force: true,
  });
  cy.get(':nth-child(1) > .rightItems > .dropdown').click();

  cy.get(`.visible > .scrolling > :nth-child(2)`)
    .last()
    .click();

  if (walletNumber) {
    cy.get(':nth-child(3) > .rightItems > .dropdown').click();

    cy.get(`.visible > .scrolling > :nth-child(${walletNumber})`)
      .last()
      .click();
  }
};

const fillAmount = (amount = 1000) => {
  cy.get('.form-information > .ui > input').type(`${amount}`);
};

const submitForm = error => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2022',
            Description:
              'You do not have enough money in this wallet for this operation(10000000000)',
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
            AmountToBeSent: '1.11 USD',
            Amount: '1000.00 RWF',
            Fees: '0.00 RWF',
            ExternalFees: '0.00 RWF',
            ExchangeFees: '6.80 RWF',
            Taxes: '0.34 RWF',
            TotalAmount: '1007.14 RWF',
            ExchangeRate: '1:0.001110',
          },
        ],
  }).as('confirmation');
  cy.get('.actions button.ui.positive.button').click();
};

const confirmExchange = () => {
  cy.route({
    method: 'POST',
    url: '/TransferFunds2UWallet',
    status: 200,
    response: [
      {
        OK: '200',
        Result: 'Success',
        AmountSent: '0.00 BTC',
        Amount: '1000.00 RWF',
        Fees: '0.00 RWF',
        ExternalFees: '0.00 RWF',
        ExchangeFees: '6.80 RWF',
        Taxes: '0.34 RWF',
        TotalAmount: '1007.14 RWF',
        ExchangeRate: '1:0.000000',
        SourceWallet: {
          WalletNumber: 'RWF-01-FLORIBERT',
          Balance: '12107444',
          WalletName: 'The Greatest of all!',
          Currency: 'RWF',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
        },
        TargetWallet: {
          WalletNumber: 'BTC-01-FLORIBERT',
          Balance: '499998.03125',
          WalletName: 'Bit Balance',
          Currency: 'BTC',
          Flag:
            'https://celinemoneypicfiles.blob.core.windows.net/icons/btc.png',
        },
        ReccurentTransactionsSet: 'NO',
        Description:
          'Money sent. A notification is sent to the recipient. The recipient wallet (BTC-01-FLORIBERT) is credited with0.00 BTC',
      },
    ],
  }).as('exchange');

  cy.get('.actions button.ui.positive.button').click();
};
describe('Test currency exchange', () => {
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
      status: 200,
      response: [
        {
          AccountNumber: 'EUR-01-SAMB',
          AccountName: 'Personal',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=EUR-01-SAMB',
          Balance: '19,996.97',
          CurrencyCode: 'EUR',
          Flag:
            'https://m2umoneypicfiles.blob.core.windows.net/icons/eur.png',
          Default: 'YES',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'RWF-01-SAMB',
          AccountName: 'Expenses',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-SAMB',
          Balance: '17,771,100.00',
          CurrencyCode: 'RWF',
          Flag:
            'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
        {
          AccountNumber: 'USD-01-SAMB',
          AccountName: 'Transfer',
          WalletQRCode:
            'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=USD-01-SAMB',
          Balance: '20,000.00',
          CurrencyCode: 'USD',
          Flag:
            'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
          Default: 'NO',
          HasACreditCard: 'NO',
        },
      ],
    }).as('getUserWallet');

    cy.route({
      method: 'POST',
      url: '/GetAllContactList',
      status: 200,
      response: [
        {
          ContactType: 'INTERNAL',
          ContactPID: 'BABOUR',
          FirstName: 'jaman',
          LastName: 'theman',
          PresenceStatus: '4',
          AccountVerified: 'NO',
          PictureURL:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/babour-0.png',
          PictureURLmedium:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/babourmedium-0.png',
          PictureURLsmall:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/baboursmall-0.png',
          CountryCode: 'AX',
          PhoneNumber: '',
          MainPhonePrefix: '',
          MainPhoneNumber: '',
          MainPhoneFlag:
            'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
          Phones: [
            {
              Phone: '250789919478',
              PhonePrefix: '250',
              PhoneNumber: '789 919 478',
              NumberCountryCode: 'AX',
              PhoneFlag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: '',
          DefaultWallet: { Currency: '', Flag: '' },
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-SAMB',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '19,997 EUR',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-SAMB',
              WalletName: 'Expenses',
              Currency: 'RWF',
              Balance: '17,771,100 RWF',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-SAMB',
              WalletName: 'Transfer',
              Currency: 'USD',
              Balance: '20,000 USD',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
        {
          ContactType: 'INTERNAL',
          ContactPID: 'JAMANTHEMAN',
          FirstName: 'jaman',
          LastName: 'dedy',
          PresenceStatus: '4',
          AccountVerified: 'NO',
          PictureURL:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/jamantheman-1.png',
          PictureURLmedium:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/jamanthemanmedium-0.png',
          PictureURLsmall:
            'https://m2umoneypicfiles.blob.core.windows.net/zones/jamanthemansmall-0.png',
          CountryCode: 'AX',
          PhoneNumber: '250783732214',
          MainPhonePrefix: '250',
          MainPhoneNumber: '783 732 214',
          MainPhoneFlag:
            'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
          Phones: [
            {
              Phone: '250783732214',
              PhonePrefix: '250',
              PhoneNumber: '783 732 214',
              NumberCountryCode: 'AX',
              PhoneFlag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/ax.png',
              Category: 'Private',
              CategoryCode: '1',
            },
          ],
          EMail: '',
          DefaultWallet: {
            WalletNumber: 'XAF-01-JAMANTHEMAN',
            WalletName: 'Personal',
            Currency: 'XAF',
            Flag:
              'https://m2umoneypicfiles.blob.core.windows.net/icons/xaf.png',
          },
          Favorite: 'NO',
          MySharedWalletsCount: '3',
          MySharedWallets: [
            {
              WalletNumber: 'EUR-01-SAMB',
              WalletName: 'Personal',
              Currency: 'EUR',
              Balance: '19,997 EUR',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
            {
              WalletNumber: 'RWF-01-SAMB',
              WalletName: 'Expenses',
              Currency: 'RWF',
              Balance: '17,771,100 RWF',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/rw.png',
            },
            {
              WalletNumber: 'USD-01-SAMB',
              WalletName: 'Transfer',
              Currency: 'USD',
              Balance: '20,000 USD',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/us.png',
            },
          ],
          BankAccountCount: '0',
          BankAccounts: [],
        },
      ],
    });
    cy.restoreLocalStorage();
    cy.visit('/contacts');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('should change currency', () => {
    showExchangeForm();
    fillAmount();
    submitForm();

    cy.enterPin(pin);
    confirmExchange();
    cy.get('.pin-input-form').should('not.be.visible');
  });

  it('should not change to the same wallet currency', () => {
    showExchangeForm(2);
    fillAmount();
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'The source wallet and the target wallet must not be the same',
    );
  });

  it('should not change if the amount of money is less than or equal to zero', () => {
    showExchangeForm();
    fillAmount(0);
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'The Exchange amount cannot be zero',
    );
  });

  it('should not change if the amount of money is greater than wallet balance', () => {
    showExchangeForm();
    fillAmount(10000000000);
    submitForm('error');

    cy.get('.message-component > span').should(
      'contain.text',
      'You do not have enough money in this wallet for this operation(10000000000)',
    );
  });

  it('should not change if no target wallet is selected', () => {
    showExchangeForm(0);
    fillAmount(1000);
    submitForm();

    cy.get('.message-component > span').should(
      'contain.text',
      'Please provide the target wallet number.',
    );
  });
});
