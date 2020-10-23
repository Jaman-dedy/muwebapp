const fillTheIdentityForm = () => {
  cy.get('input[name="firstName"]').type('ABCD');
  cy.get('input[name="lastName"]').type('ABCDEF');
  cy.get('input[name="email"]').type('ABCDEF@email.abc');
  cy.get('input[type="tel"]').type('6767676767', {
    force: true,
  });

  cy.get('input[name="userAgrees"]', {
    force: true,
  })
    .not('[disabled]')
    .check({ force: true })
    .should('be.checked');
};

const mockPhoneResponse = () => {
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/SendPhoneVerifCode', // that have a URL that matches
    status: 200,
    response: [
      {
        Description:
          'The confirmation code is sent via sms to the user.',
        OK: '200',
        Result: 'Success',
      },
    ], // and force the response to be: []
  });
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/PhoneNumberExists', // that have a URL that matches
    status: 200,
    response: [
      {
        Description:
          'This phone number (2506767676767) is not yet registered.',
        OK: 'NO',
        PhoneNumberFound: 'NO',
        Result: 'FALSE',
      },
    ], // and force the response to be: []
  });
};

const mockVerifOtpResponse = () => {
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/PhoneVerifResult', // that have a URL that matches
    status: 200,
    response: [
      {
        Description: 'The code is correct.',
        OK: '200',
        Result: 'Success',
      },
    ], // and force the response to be: []
  });
};

const mockUserPIDExistsResponse = () => {
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/UserPIDExists', // that have a URL that matches
    status: 200,
    response: [
      {
        OK: 'NO',
        UserPIDExits: 'NO',
        Description: 'This personal ID (ABCDE) is available.',
        Result: 'FALSE',
      },
    ], // and force the response to be: []
  });
};

const mockRegisterFullUserResponse = () => {
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/CreateFullUserAccount', // that have a URL that matches
    status: 200,
    response: [
      {
        OK: '200',
        Description: 'You have successfully registered your account.',
        Note: 'We have created the following wallets for you.',
        UserName: 'ABCDE',
        MainWalletNumber: 'EUR-01-ABCDE',
        Wallets: [
          {
            WalletNumber: 'EUR-01-ABCDE',
            CurrencyCode: 'EUR',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
          },
        ],
        Result: 'Success',
      },
    ], // and force the response to be: []
  });
};

const fillThePinNumberForm = () => {
  cy.get('input[name="digit0"]')
    .first()
    .type('1');
  cy.get('input[name="digit1"]')
    .first()
    .type('1');
  cy.get('input[name="digit2"]')
    .first()
    .type('2');
  cy.get('input[name="digit3"]')
    .first()
    .type('2');

  cy.get('input[name="digit0"]')
    .last()
    .type('1');
  cy.get('input[name="digit1"]')
    .last()
    .type('1');
  cy.get('input[name="digit2"]')
    .last()
    .type('2');
  cy.get('input[name="digit3"]')
    .last()
    .type('2');
};

const fillPasswordForm = () => {
  cy.get('input[name="password"]').type('Abc12345!');
  cy.get('input[name="confirmPassword"]').type('Abc12345!');
};

const mockLocateUserResponse = () => {
  cy.route({
    method: 'POST', // Route all POST requests
    url: '/LocateUser', // that have a URL that matches
    status: 200,
    response: [
      {
        OK: '200',
        PID: 'ago',
        Description: 'User details found',
        FirstName: 'Alberto Gerardo',
        LastName: 'Olympio',
        AccountVerified: 'NO',
        IDVerified: '1',
        PoRVerified: '1',
        StreetNumber: '',
        Street1: '4327 Rue PE 35, Dakar, Senegal',
        Street2: 'cccc',
        City: 'Dakar',
        Country: 'Senegal',
        PictureURL:
          'https://celinemoneypicfiles.blob.core.windows.net/zones/ago.png',
        MainPhone: '221777979343',
        MainPhonePrefix: '221',
        MainPhoneNumber: '77 797 93 43',
        Wallets: [
          {
            AccountNumber: 'ALL-03-AGO',
            AccountName: 'gvv',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=ALL-03-AGO',
            CurrencyCode: 'ALL',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/al.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'EUR-01-AGO',
            AccountName: 'Operations',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=EUR-01-AGO',
            CurrencyCode: 'EUR',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/eur.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'RWF-01-AGO',
            AccountName: 'Rwanda Op',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=RWF-01-AGO',
            CurrencyCode: 'RWF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/rw.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'SLL-01-AGO',
            AccountName: 'Rokel Demo',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=SLL-01-AGO',
            CurrencyCode: 'SLL',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/sl.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'USD-01-AGO',
            AccountName: 'Investments',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=USD-01-AGO',
            CurrencyCode: 'USD',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/us.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'XAF-01-AGO',
            AccountName: 'Camer',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=XAF-01-AGO',
            CurrencyCode: 'XAF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/xaf.png',
            Default: 'NO',
          },
          {
            AccountNumber: 'XOF-01-AGO',
            AccountName: 'Personal',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=XOF-01-AGO',
            CurrencyCode: 'XOF',
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/xof.png',
            Default: 'NO',
          },
        ],
        Result: 'Success',
      },
    ], // and force the response to be: []
  });
};

describe('Register', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/register');
  });
  it('should go to the Register page', () => {
    cy.location('pathname').should('eq', '/register');
  });

  it('the button should be disabled when the form is half filled', () => {
    cy.get('input[name="firstName"]').type('ABCD');
    cy.get('input[name="userAgrees"]', {
      force: true,
    })
      .not('[disabled]')
      .check({ force: true })
      .should('be.checked');

    cy.contains('NEXT').should('be.disabled');
  });

  it('get an error when the email is valid', () => {
    cy.get('input[name="firstName"]').type('ABCD');
    cy.get('input[name="lastName"]').type('ABCDEF');
    cy.get('input[name="email"]').type('ABCDEF@email');
    cy.get('input[type="tel"]').type('6767676767', {
      force: true,
    });

    cy.get('input[name="userAgrees"]', {
      force: true,
    })
      .not('[disabled]')
      .check({ force: true })
      .should('be.checked');

    cy.contains('NEXT').click({ force: true });

    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please provide a valid e-mail.',
    );
  });

  it('should go to the OTP step', () => {
    mockPhoneResponse();
    fillTheIdentityForm();

    cy.contains('NEXT').click({ force: true });

    cy.get('h2.right-sub-header').should(
      'have.text',
      'Phone verification',
    );
  });

  it('get error when the OTP is not valid', () => {
    mockPhoneResponse();
    fillTheIdentityForm();

    cy.contains('NEXT').click({ force: true });

    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.otpMessage>h5').should('have.text', 'Wrong code');
  });

  it('should go to the next step', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();

    cy.contains('NEXT').click({ force: true });

    cy.get('input[name="OTP"]').type('123456');

    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );
  });

  it('get error when the username is not provided', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();

    cy.contains('NEXT').click({ force: true });

    cy.get('input[name="OTP"]').type('123456');

    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.contains('Next').click({ force: true });
    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please provide a valid Username',
    );
  });

  it('get error when the username is already taken', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();

    cy.route({
      method: 'POST', // Route all POST requests
      url: '/UserPIDExists', // that have a URL that matches
      status: 200,
      response: [
        {
          OK: 'YES',
          UserPIDExits: 'YES',
          Description:
            'This personal ID (AGO) is already registered.',
          Result: 'TRUE',
          Messages: [
            {
              ID: '39',
              Text:
                'Personal ID already in use. Kindly choose another one.',
            },
          ],
        },
      ], // and force the response to be: []
    });

    cy.contains('NEXT').click({ force: true });

    cy.get('input[name="OTP"]').type('123456');

    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.prompt.label').should(
      'have.text',
      'Personal ID already in use. Kindly choose another one.',
    );
  });

  it('should go to the password form', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();

    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });

    cy.get('input[name="OTP"]').type('123456');

    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );
  });

  it('the next button should be disabled when the passwords do not match or are not strong enough', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    cy.get('input[name="password"]').type('abcde');
    cy.get('input[name="confirmPassword"]').type('abcde');
    cy.contains('NEXT').should('be.disabled');
  });

  it('should go to the pin form', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    cy.get('input[name="password"]').type('Abc12345!');
    cy.get('input[name="confirmPassword"]').type('Abc12345!');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );
  });

  it("get an error when the pin numbers don't match", () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    cy.get('input[name="password"]').type('Abc12345!');
    cy.get('input[name="confirmPassword"]').type('Abc12345!');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    cy.get('input[name="digit0"]')
      .first()
      .type('1');
    cy.get('input[name="digit1"]')
      .first()
      .type('8');
    cy.get('input[name="digit2"]')
      .first()
      .type('3');
    cy.get('input[name="digit3"]')
      .first()
      .type('4');

    cy.get('input[name="digit0"]')
      .last()
      .type('1');
    cy.get('input[name="digit1"]')
      .last()
      .type('2');
    cy.get('input[name="digit2"]')
      .last()
      .type('3');
    cy.get('input[name="digit3"]')
      .last()
      .type('4');

    cy.contains('NEXT').click({ force: true });
    cy.get('div.ui.pointing.prompt.label').should(
      'have.text',
      'Your PIN numbers do not match.',
    );
  });

  it('get an error when the pin numbers are consecutive', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    cy.get('input[name="password"]').type('Abc12345!');
    cy.get('input[name="confirmPassword"]').type('Abc12345!');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    cy.get('input[name="digit0"]')
      .first()
      .type('1');
    cy.get('input[name="digit1"]')
      .first()
      .type('2');
    cy.get('input[name="digit2"]')
      .first()
      .type('3');
    cy.get('input[name="digit3"]')
      .first()
      .type('4');

    cy.get('input[name="digit0"]')
      .last()
      .type('1');
    cy.get('input[name="digit1"]')
      .last()
      .type('2');
    cy.get('input[name="digit2"]')
      .last()
      .type('3');
    cy.get('input[name="digit3"]')
      .last()
      .type('4');

    cy.contains('NEXT').click({ force: true });
    cy.get('div.ui.pointing.prompt.label').should(
      'have.text',
      'Consecutive numbers are not allowed.',
    );
  });

  it('get an error when the pin number is not valid', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    cy.get('input[name="password"]').type('Abc12345!');
    cy.get('input[name="confirmPassword"]').type('Abc12345!');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    cy.get('input[name="digit0"]')
      .first()
      .type('1');
    cy.get('input[name="digit1"]')
      .first()
      .type('2');
    cy.get('input[name="digit2"]').first();

    cy.get('input[name="digit0"]')
      .last()
      .type('1');
    cy.get('input[name="digit1"]')
      .last()
      .type('2');
    cy.get('input[name="digit2"]')
      .last()
      .type('3');
    cy.get('input[name="digit3"]')
      .last()
      .type('4');

    cy.contains('NEXT').click({ force: true });
    cy.get('div.ui.pointing.prompt.label')
      .first()
      .should(
        'have.text',
        'Please provide a valid PIN number. It must contains 4 digits.',
      );
    cy.get('div.ui.pointing.prompt.label')
      .last()
      .should('have.text', 'Your PIN numbers do not match.');
  });

  it('should go to the referral form', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    fillPasswordForm();
    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    fillThePinNumberForm();

    cy.contains('NEXT').click({ force: true });
  });

  it('should register the user after clicking on Register now', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();
    mockRegisterFullUserResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    fillPasswordForm();

    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    fillThePinNumberForm();

    cy.contains('NEXT').click({ force: true });

    cy.contains('COMPLETE REGISTRATION').click({ force: true });

    cy.get('h1.headline').should('have.text', 'Congratulations.');
    cy.get('div.congratulate').should(
      'have.text',
      'ABCDE, you made it!',
    );
  });

  it('should should search for the referee before Registering ', () => {
    mockPhoneResponse();
    fillTheIdentityForm();
    mockVerifOtpResponse();
    mockUserPIDExistsResponse();
    mockRegisterFullUserResponse();

    cy.contains('NEXT').click({ force: true });
    cy.get('input[name="OTP"]').type('123456');
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Username',
    );

    cy.get('input[name="personalId"]').type('abcde');
    cy.contains('Next').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'Password',
    );

    fillPasswordForm();

    cy.contains('NEXT').click({ force: true });
    cy.get('div.wrap-auth>h2.right-sub-header').should(
      'have.text',
      'PIN Number',
    );

    fillThePinNumberForm();

    cy.contains('NEXT').click({ force: true });

    cy.contains('Add a referral').click({ force: true });

    cy.get('input[name="ReferralPID"]').type('abcdef!@');
    cy.get('button[type="button"].cursor-pointer').click({
      force: true,
    });

    cy.get('div.error>div.content>p').should(
      'have.text',
      'The Username should not contain a special character',
    );

    cy.get('input[name="ReferralPID"]')
      .clear()
      .type('abcdef');
    cy.get('button[type="button"].cursor-pointer').click({
      force: true,
    });

    cy.get('div.error>div.content>p').should(
      'have.text',
      'User account not found for the user (abcdef).',
    );

    mockLocateUserResponse();

    cy.get('input[name="ReferralPID"]')
      .clear()
      .type('abcdef');
    cy.get('button[type="button"].cursor-pointer').click({
      force: true,
    });

    cy.contains('REGISTER NOW').click({ force: true });
    cy.get('h1.headline').should('have.text', 'Congratulations.');
    cy.get('div.congratulate').should(
      'have.text',
      'ABCDE, you made it!',
    );
  });
});
