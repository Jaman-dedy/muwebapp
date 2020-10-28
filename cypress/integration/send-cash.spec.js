/* eslint-disable no-undef */
const pin = '1122';
const username = 'SAMB';
const password = 'Ihave1PC!';

const submitAmountForm = error => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2022',
            Description:
              'You do not have enough money in this wallet for this operation(1000)',
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
            AmountToBeSent: '998.73 RWF',
            Amount: '1.00 EUR',
            Fees: '0.00 EUR',
            ExternalFees: '0.00 EUR',
            ExchangeFees: '0.01 EUR',
            Taxes: '0.00 EUR',
            TotalAmount: '1.01 EUR',
            ExchangeRate: '1:998.726990',
          },
        ],
  }).as('confirmTransaction');

  cy.get('.actions button.ui.positive.button', {
    timeout: 3000,
  }).click();
};

const submitForm = error => {
  cy.route({
    method: 'POST',
    url: '/SendCash',
    status: error ? 401 : 200,
    response: error
      ? [
          {
            Error: '2022',
            Description: 'Wrong PIN',
            Result: 'FAILED',
          },
        ]
      : [
          {
            OK: '200',
            Description:
              'Funds sent and the wallets are updated. Notification is sent to both parties.',
            Result: 'Success',
            AmountSent: '656.00 RWF',
            Amount: '1.00 EUR',
            Fees: '0.00 EUR',
            ExternalFees: '0.00 EUR',
            ExchangeFees: '0.01 EUR',
            Taxes: '0.00 EUR',
            TotalAmount: '1.01 EUR',
            ExchangeRate: '1:656.000000',
            TransferNumber: '87 06 21 31 18',
            SecurityCode: '41 26',
            VoucherQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=87062131184126',
            SourceWallet: {
              WalletNumber: 'EUR-01-SAMB',
              Balance: '19994.951171875',
              WalletName: 'Personal',
              Currency: 'EUR',
              Flag:
                'https://m2umoneypicfiles.blob.core.windows.net/icons/eur.png',
            },
          },
        ],
  }).as('sendCash');
  cy.get('button.ui.positive.button').click();
};
const fillAmountField = value => {
  cy.get(
    ':nth-child(1) > .rightItems > .dropdown > :nth-child(1) > .caret',
  ).click();

  cy.get('.dropdown > .visible > .scrolling > :nth-child(1)')
    .first()
    .click();

  cy.get('input[name="amount"]', { timeout: 3000 }).type(`${value}`);
};

const fillDetailsForm = () => {
  cy.get('input[name="reference"]', { timeout: 60000 }).type(
    'Test send cash',
  );
  cy.get('input[name="description"]', { timeout: 60000 }).type(
    'Test send cash description.',
  );
};

const fillRecurringForm = (startDateIndex = 3, endDateIndex = 4) => {
  cy.get('.one-tme-transfer .toggle-switch-switch').click();
  cy.get('.ui.search.dropdown>input.search').type('2nd');
  cy.get('.visible > :nth-child(1) > .text').click();

  cy.get('input[name="startDate"]').focus();
  cy.get(
    `:nth-child(${startDateIndex}) > :nth-child(3) > .suicr-content-item`,
  ).click({ force: true });

  cy.get('input[name="endDate"]').focus();
  cy.get(
    `:nth-child(${endDateIndex}) > :nth-child(3) > .suicr-content-item`,
  )
    .last()
    .click({ force: true });
};
// Opens transfer amount form and populates the amount field if a value is provided
const showAmountForm = amount => {
  cy.get(':nth-child(2) > :nth-child(2) > button', {
    timeout: 20000,
  }).click({ force: true });

  cy.route({
    method: 'POST',
    url: '/GetAllContactList',
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
  }).as('getContactList');

  cy.get('a[href="/contacts?ref=send-cash"]').click({
    force: true,
  });

  cy.get('div.contact-item', { timeout: 20000 })
    .first()
    .click({
      force: true,
    });
  cy.wait('@getUserWallet');

  if (!Number.isNaN(amount)) {
    fillAmountField(amount);
  }
};

describe('Test Transfer Cash to contact', () => {
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
    cy.visit('/contacts?ref=send-cash');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('Should send cash to contact', () => {
    showAmountForm(1);
    cy.location('pathname').should('eq', '/contacts');

    submitAmountForm();
    fillDetailsForm();

    // fill pin form
    cy.enterPin(pin);

    cy.get('.ss-amount strong').should('contain.text', '1');
    submitForm();
    cy.wait('@sendCash');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should not transfer the amount of money less than or equal to zero', () => {
    showAmountForm(0);

    cy.get('div.select-contact').should(
      'have.text',
      'Select a contact',
    );
    submitAmountForm();
    cy.location('pathname').should('eq', '/contacts');

    cy.get('.message-component span', { timeout: 10000 })
      .first()
      .should('have.text', 'The amount cannot be zero');
  });

  it('Should not send amount of money greater than wallet balance.', () => {
    showAmountForm(10000000000000000000);
    submitAmountForm('error');

    cy.get('.message-component span', {
      timeout: 7000,
    })
      .first()
      .should(
        'contain',
        'You do not have enough money in this wallet for this',
      );
  });

  it('Should raise an error if the amount field has no value.', () => {
    showAmountForm();
    submitAmountForm();

    cy.get('.message-component span', { timeout: 10000 })
      .first()
      .should(
        'contain',
        'You must enter the amount for this operation.',
      );
  });

  it('Should be able create recurring transactions', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();

    fillRecurringForm();
    cy.enterPin(pin);
    submitForm();
    cy.wait('@sendCash');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should be able create recurring transactions and send cash directly', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();

    cy.get('.send-now  .toggle-switch-switch').click();

    cy.enterPin(pin);

    submitForm();
    cy.wait('@sendCash');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should not allow starting date to be greater than ending date. ', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm(4, 3);
    cy.enterPin(pin);
    submitForm();

    cy.get('.message-component > span', { timeout: 10000 }).should(
      'contain',
      'Please choose an end date that is later than the start date',
    );
  });

  it('Should not submit transfer cash form without a pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    submitForm();

    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please provide your PIN number.',
    );
  });

  it('Should not submit transfer cash form without a correct pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    cy.enterPin('0000');

    submitForm('error');

    // wait for the toast and check it's content
    cy.get('.message-component span', { timeout: 20000 }).should(
      'contain',
      'Wrong PIN',
    );
  });
});
