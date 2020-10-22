describe('Reset Password', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/reset-password');
  });
  it('should go to the `/reset-password` page', () => {
    cy.location('pathname').should('eq', '/reset-password');
  });

  it('get error when passing wrong credential', () => {
    cy.get('input[name="personalId"]').type('ABCD');
    cy.get('input[name="lastName"]').type('ABCDEF');
    cy.get('input[type="tel"]').type('6767676767', {
      force: true,
    });
    cy.contains('NEXT').click({ force: true });

    cy.get('p.messageText').should(
      'have.text',
      'User account (ABCD) not found',
    );
  });

  it('get error when the username is not filled', () => {
    cy.get('input[name="lastName"]').type('ABCD');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please Enter your user name',
    );
  });

  it('get error when the Last Name is not filled', () => {
    cy.get('input[name="personalId"]').type('ABCD');
    cy.contains('NEXT').click({ force: true });
    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please Enter your Last Name',
    );
  });

  it('should go to the next step', () => {
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/ResetPasswordPrequalification', // that have a URL that matches '/users/*'
      status: 200,
      response: [
        {
          Description:
            'Data Provided by the users are OK. OTP has been sent to the user.',
          OK: '200',
          Result: 'Success',
        },
      ], // and force the response to be: []
    });

    cy.route({
      method: 'POST', // Route all POST requests
      url: '/ResetUserPasswordAndPIN', // that have a URL that matches '/users/*'
      status: 200,
      response: [
        {
          Description:
            'Data Provided by the users are OK. OTP has been sent to the user.',
          OK: '200',
          Result: 'Success',
        },
      ], // and force the response to be: []
    });

    cy.get('input[name="personalId"]').type('ABCD');
    cy.get('input[name="lastName"]').type('ABCDEF');
    cy.get('input[type="tel"]').type('6767676767', {
      force: true,
    });
    cy.contains('NEXT').click({ force: true });

    cy.get('div.white-space-nowrap').should(
      'have.text',
      'Kindly provide answers to these questions',
    );

    cy.contains('NEXT').click({ force: true });

    cy.get('form')
      .find('input')
      .should('have.length', '2');

    cy.get('input[name="password"]').type('Abc@12345');
    cy.get('input[name="confirmPassword"]').type('Abc@12345', {
      force: true,
    });

    cy.contains('NEXT').click({ force: true });

    cy.get('form')
      .find('input')
      .should('have.length', '8');

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
      .type('0');

    cy.get('input[name="digit0"]')
      .last()
      .type('1');
    cy.get('input[name="digit1"]')
      .last()
      .type('8');
    cy.get('input[name="digit2"]')
      .last()
      .type('3');
    cy.get('input[name="digit3"]')
      .last()
      .type('0');

    cy.contains('Submit').click({ force: true });

    cy.get('p.otpTitle').should(
      'have.text',
      'Please provide the verification code sent to your phone via SMS',
    );

    cy.get('input[name="OTP"]').type('123456');

    cy.get('h1.headline>span').should('have.text', 'Congratulations');
  });
});
