describe('Login', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/login');
  });
  it('should go to the Login page', () => {
    cy.location('pathname').should('eq', '/login');
  });

  it('get user account not found whhen PID is not valid', () => {
    cy.get('input[name="PID"]').type('KARL12AK');
    cy.get('input[name="Password"]').type('Karl@1234');
    cy.get('input[name="digit0"]').type('1');
    cy.get('input[name="digit1"]').type('2');
    cy.get('input[name="digit2"]').type('3');
    cy.get('input[name="digit3"]').type('4');
    cy.contains('CONNECT').click({ force: true });
    cy.get('p.messageText').should(
      'have.text',
      'User Account not found. (KARL12AK)',
    );
  });

  it('get error when passing wrong credentials', () => {
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/CheckUserCredential', // that have a URL that matches '/users/*'
      status: 401,
      response: [
        {
          OK: '401',
          Result: 'Failed',
          Description: 'Wrong user credential',
        },
      ], // and force the response to be: []
    });
    cy.get('input[name="PID"]').type('LAFOUINEBABY');
    cy.get('input[name="Password"]').type('Karl@1234');
    cy.get('input[name="digit0"]').type('1');
    cy.get('input[name="digit1"]').type('2');
    cy.get('input[name="digit2"]').type('3');
    cy.get('input[name="digit3"]').type('4');
    cy.contains('CONNECT').click({ force: true });
    cy.get('p.messageText').should(
      'have.text',
      'Wrong user credential',
    );
  });

  it('get error the username is not filled', () => {
    cy.contains('CONNECT').click({ force: true });
    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please provide a valid Username',
    );
  });

  it('get error the password is not filled', () => {
    cy.get('input[name="PID"]').type('ABCD');
    cy.contains('CONNECT').click({ force: true });
    cy.get('div.error>div.pointing').should(
      'have.text',
      'Please provide a valid Password. It must contains at least 8 digits and at least one special character such as (!@#$%&*).',
    );
  });

  it('get error the pin number is not valide', () => {
    cy.get('input[name="PID"]').type('ABCD');
    cy.get('input[name="Password"]').type('Abcd@1234');
    cy.get('input[name="digit0"]').type('1');
    cy.contains('CONNECT').click({ force: true });
    cy.get('div.field>div.pointing').should(
      'have.text',
      'Please provide your PIN number.',
    );
  });

  it('should redirect to home when passing valid credentials', () => {
    cy.route({
      method: 'POST', // Route all POST requests
      url: '/CheckUserCredential', // that have a URL that matches '/users/*'
      status: 200,
      response: [
        {
          OK: '200',
          Description: 'Credentials Correct and Verified',
          Note: 'Your Tokens have been generated',
          UserLoggedIn: 'TRUE',
          UserMustChangePassword: 'NO',
          UserLoginCorrect: 'TRUE',
          LiveToken:
            '411740c4672343033a12314627a4621449664d82684329a33f823f6654f56ad4475658727f7637f338653a872dd474755a6444d4635439f5348739134904794647d557657f9653f63376390332f3626353435543607334f537733f74268361344643',
          RefreshToken:
            '44974034645324d33e13394627f56aa557775f4264a327d33c15330731f46c5454574cb564e558c335833646221369744993533663e62f3637453785291669c449e35437799533f434743a7422437d944393588570733ff637833f24460361a44693',
          MaxLogonAttempt: '3',
          MaxIdleTimeForLogoff: '10',
          Note2:
            "The LiveToken should be assigned to the 'From' header of your requests that require a  Token",
          PID: 'KARLTEST',
          HomeCountry: 'RW',
          DOBSet: 'NO',
          QuestionsSet: 'NO',
          KYCDocReceived: 'YES',
          UserVerified: 'NO',
          IDVerified: '2',
          PoRVerified: '2',
          UserLogedIN: 'YES',
          UserLocked: 'NO',
          Currencies: [
            {
              CurrencyCode: 'GBP',
              Flag:
                'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
            },
          ],
          UserData: {
            OK: '200',
            Description: 'User details found',
            PID: 'KARLTEST',
            PIDQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=KARLTEST',
            FirstName: 'karltest',
            LastName: 'karltest',
            PresenceStatus: '0',
            AccountVerified: 'NO',
            FirstTimeLogin: 'NO',
            IDVerified: '2',
            PoRVerified: '2',
            DateOfBirth: '',
            Gender: { Number: '0', Name: 'Non précisé' },
            MinimumAge: '18',
            City: '',
            CountryName: '',
            State: '',
            Address1: '',
            Address2: '',
            POBox: '',
            CompanyName: '',
            BusinessAccount: 'NO',
            MainPhone: '447868150810',
            MainPhonePrefix: '44',
            MainPhoneNumber: '786 815 0810',
            MainPhoneFlag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
            Phones: [
              {
                Phone: '+447868150810',
                PhonePrefix: '44',
                PhoneNumber: '786 815 0810',
                NumberCountryCode: 'gb',
                PhoneFlag:
                  'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
                Category: 'Privé',
                CategoryCode: '1',
              },
            ],
            MainEmail: '',
            Emails: [
              { Email: '', Category: 'Privé', CategoryCode: '1' },
            ],
            Flag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
            PictureURL:
              'https://celinemoneypicfiles.blob.core.windows.net/zones/karltest.png',
            PictureURLmedium:
              'https://celinemoneypicfiles.blob.core.windows.net/zones/karltestmedium.png',
            PictureURLsmall:
              'https://celinemoneypicfiles.blob.core.windows.net/zones/karltestsmall.png',
            Language: 'fr',
            LanguageName: 'Français',
            UserIDURL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-1.png',
            UserProofOfAddressURL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-2.png',
            UserExtraDoc1URL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-3.png',
            UserExtraDoc2URL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-4.png',
            UserExtraDoc3URL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-5.png',
            UserExtraDoc4URL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-6.png',
            UserExtraDoc5URL:
              'https://celinemoneypicfiles.blob.core.windows.net/kyc/karltest-7.png',
            Rewards: {
              RegistrationDate:
                "Date d'inscription: 2020-09-23 16:23:45",
              Title: 'Programme de fidelité',
              Year: '2020',
              StatusCode: '0',
              StatusText: 'Premier Niveau',
              LearnMoreURL: 'https://www.oryx.money',
              TotalPoints: {
                PointsText: 'Points totaux',
                PointsValue: '50',
              },
              YearPoints: {
                PointsText: 'Points gagnés cette année.',
                PointsValue: '50',
              },
              InCount: {
                CountText: 'Nombre de transactions entrantes',
                CountValue: '0',
              },
              OutCount: {
                CountText: 'Nombre de transactions sortantes',
                CountValue: '1',
              },
              NextStatusCode: '1',
              NextLevel: {
                PointsText:
                  'Points supplémentaires nécessaires pour le niveau suivant',
                PointsValue: '4950',
                LevelText: 'Niveau Suivant',
                LevelValue: 'Explorateur',
              },
              ReferralPoints: {
                PointsText:
                  'Gagnez ces points pour chaque personne que vous nous référez.',
                PointsValue: '75',
              },
              RewardStatusChangeCount: {
                PointsText:
                  'Nombre de transactions requises pour changer de niveau',
                PointsValue: '100',
              },
              PointsPerAmount: {
                PointsText1: 'Recevez',
                PointsText2: 'pour chaque',
                PointsText13: 'transféré',
                PointsValue: '2',
                AmountValue: '100',
                AmountCurrency: 'USD',
              },
              LevelPoints: {
                PointsText0: 'Premier Niveau',
                PointsValue0: '0',
                PointsText1: 'Explorateur',
                PointsValue1: '5000',
                PointsText2: 'Argent',
                PointsValue2: '10000',
                PointsText3: 'Bronze',
                PointsValue3: '15000',
                PointsText4: 'OR',
                PointsValue4: '20000',
                PointsText5: 'Platinum',
                PointsValue5: '25000',
                PointsText6: 'Ambassadeur',
                PointsValue6: '30000',
              },
            },
            DefaultWallet: 'GBP-01-KARLTEST',
            Balance: '0',
            Currency: 'GBP',
            CurrencyFlag:
              'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
            Country: 'GB',
            WalletQRCode:
              'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=GBP-01-KARLTEST',
            HasACreditCard: 'NO',
            Wallets: [
              {
                AccountNumber: 'GBP-01-KARLTEST',
                AccountName: 'Personal',
                WalletQRCode:
                  'http://chart.apis.google.com/chart?chs=200x200&cht=qr&chld=M&chl=GBP-01-KARLTEST',
                Balance: '0',
                CurrencyCode: 'GBP',
                Flag:
                  'https://celinemoneypicfiles.blob.core.windows.net/icons/gb.png',
                Default: 'YES',
                HasACreditCard: 'NO',
              },
            ],
          },
          Result: 'Success',
        },
      ], // and force the response to be: []
    });

    cy.get('input[name="PID"]').type('LAFOUINEBABY');
    cy.get('input[name="Password"]').type('Lafouine2020@');
    cy.get('input[name="digit0"]').type('1');
    cy.get('input[name="digit1"]').type('1');
    cy.get('input[name="digit2"]').type('2');
    cy.get('input[name="digit3"]').type('2');
    cy.contains('CONNECT').click({ force: true });
    cy.location('pathname').should('eq', '/');
  });
});
