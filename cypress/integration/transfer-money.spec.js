const pin = '2580';
const username = 'mwibutsa';
const password = 'Password@1996';

const CONFIRMATION_DATA = {
  LoginName: 'M2U',
  APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
  Amount: '1',
  AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
  CountryCode: 'RW',
  SourceWallet: 'RWF-01-FLORIBERT',
  TargetCurrency: 'RWF',
  TargetType: '1',
};
const submitAmountForm = (
  response = [
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
  status = 200,
) => {
  cy.route({
    method: 'POST',
    url: '/TransferConfirmation',
    data: CONFIRMATION_DATA,
    status,
    response,
  }).as('confirmTransaction');

  cy.get('.actions button.ui.positive.button', {
    timeout: 3000,
  }).click();
};
const DATA = {
  APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
  AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
  LoginName: 'M2U',
};

const submitForm = (
  wallet = 'RWF-01-FLORIBERT',
  recurrent = 'NO',
  sendNow = 'YES',
  response = [
    {
      OK: '200',
      Result: 'Success',
      AmountSent: '9.00 RWF',
      Amount: '9.00 RWF',
      Fees: '0.00 RWF',
      ExternalFees: '0.00 RWF',
      ExchangeFees: '0.00 RWF',
      Taxes: '0.00 RWF',
      TotalAmount: '9.00 RWF',
      ExchangeRate: '1:1.000000',
      SourceWallet: {
        WalletNumber: 'RWF-01-FLORIBERT',
        Balance: '12217500',
        WalletName: 'The Greatest of all!',
        Currency: 'RWF',
        Flag:
          'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
      },
      ReccurentTransactionsSet: 'NO',
      Description:
        "Amafaranga yoherejwe Ubutumwa bwoherejwe ku wakira Ikofi y'uwakira (RWF-01-MWIBUTSA) Yashyizwemo angana na9.00 RWF",
    },
  ],
  status = 200,
) => {
  const TRANSFER_FUNDS_DATA = {
    APIKey: 'k8a2miv9WKLP6Bv2LEFl0rCxAHw0BIVxW3Am3L3Y6OZzq',
    Amount: '9',
    AppID: 'kjcSNdVw2AiMdtDubTJJ1C3Mk',
    ContactPID: 'MWIBUTSA',
    CountryCode: 'RW',
    DateFrom: '',
    DateTo: '',
    Day: '0',
    Description: 'FLORIBERT',
    LoginName: 'M2U',
    PIN: '2580',
    Reccurent: recurrent,
    Reference: 'Hello',
    SendNow: sendNow,
    SourceWallet: wallet,
    TargetWallet: 'RWF-01-MWIBUTSA',
    UseDefaultWallet: 'YES',
  };
  cy.route({
    method: 'POST',
    url: '/TransferFunds2UWallet',
    status,
    data: TRANSFER_FUNDS_DATA,
    response,
  }).as('sendMoney');
  cy.get('button.ui.positive.button').click();
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

const fillDetailsForm = () => {
  cy.get('input[name="reference"]', { timeout: 60000 }).type(
    'Test send money',
  );
  cy.get('input[name="description"]', { timeout: 60000 }).type(
    'Test send money description.',
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
    url: 'GetAllContactList',
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
  }).as('getContactList');

  cy.get('a[href="/contacts?ref=send-money"]').click({
    force: true,
  });

  cy.get('div.contact-item', { timeout: 20000 })
    .last()
    .click({
      force: true,
    });
  cy.wait('@getUserWallet');

  if (!Number.isNaN(amount)) {
    fillAmountField(amount);
  }
};

describe('Test Transfer Money to contact', () => {
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
    cy.visit('/contacts?ref=send-money');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should have token in localStorage', () => {
    cy.getLocalStorage('token').should('exist');
  });

  it('Should send money to contact', () => {
    showAmountForm(1);
    cy.location('pathname').should('eq', '/contacts');

    submitAmountForm();
    fillDetailsForm();

    // fill pin form
    cy.enterPin(pin);

    cy.get('.ss-amount strong').should('contain.text', '1');
    submitForm();
    cy.wait('@sendMoney');
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
    submitAmountForm(
      [
        {
          Error: '2022',
          Description:
            'You do not have enough money in this wallet for this operation(1000)',
          Result: 'FAILED',
        },
      ],
      401,
    );

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

  it('Should be able to send money from any wallet', () => {
    showAmountForm();
    fillAmountField(1);
    submitAmountForm();

    fillDetailsForm();
    cy.enterPin(pin);
    submitForm('EUR-01-FLORIBERT');
    cy.wait('@sendMoney');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should be able create recurring transactions', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();

    fillRecurringForm();
    cy.enterPin(pin);
    submitForm('RW-O1-FLORIBERT', 'YES', 'NO');
    cy.wait('@sendMoney');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should be able create recurring transactions and send money directly', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();

    cy.get('.send-now  .toggle-switch-switch').click();

    cy.enterPin(pin);

    submitForm('RW-O1-FLORIBERT', 'YES', 'NO');
    cy.wait('@sendMoney');
    cy.get('.ss-content').should('not.be.visible');
  });

  it('Should not allow starting date to be greater than ending date. ', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm(4, 3);
    cy.enterPin(pin);
    submitForm();

    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please choose an end date thats later than the start date',
    );
  });

  it('Should not submit transfer money form without a pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    // cy.enterPin(pin);
    submitForm();

    cy.get('.message-component span', { timeout: 10000 }).should(
      'contain',
      'Please provide your PIN number.',
    );
  });

  it('Should not submit transfer money form without a correct pin.', () => {
    showAmountForm(1);
    submitAmountForm();
    fillDetailsForm();
    fillRecurringForm();
    cy.enterPin('0000');

    submitForm(
      'RW-O1-FLORIBERT',
      'YES',
      'NO',
      [
        {
          Error: '2022',
          Description: 'Wrong PIN',
          Result: 'FAILED',
        },
      ],
      401,
    );

    // wait for the toast and check it's content
    cy.get('.message-component span', { timeout: 20000 }).should(
      'contain',
      'Wrong PIN',
    );
  });
});
