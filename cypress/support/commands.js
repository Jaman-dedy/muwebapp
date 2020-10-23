// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands';

Cypress.Commands.add('enterPin', pin => {
  cy.get('input[name="digit0"]').type(pin[0]);
  cy.get('input[name="digit1"]').type(pin[1]);
  cy.get('input[name="digit2"]').type(pin[2]);
  cy.get('input[name="digit3"]').type(pin[3]);
});

Cypress.Commands.add('loginAs', (PID, password, pin) => {
  cy.request({
    method: 'POST',
    url: 'https://sandbox.m2u.money:9090/CheckUserCredential',
    body: {
      APIKey: 'rGHXVXHtOOlcB65DQhePajfzWE0J5Y2AzBPs9TmDhA0e0',
      AppID: 'YSPdYr89xAXCwvi8J4N5uX77v',
      AppType: 4,
      ClientName: 'Chrome',
      ClientVersion: '85.0',
      CountryCode: 'rw',
      Description: '2U Web Authentication',
      DeviceOS: 'GNU/Linux',
      DeviceType: 6,
      IMEI: '',
      Latitude: -1.9496959999999999,
      LoginName: 'M2U',
      Longitude: 30.1006848,
      MAC: 'Not found',
      OSVersion: '',
      PID,
      PIN: pin,
      Password: password,
      PhoneNumber: '',
      Roaming: '0',
      SerialNumber: '',
    },
  })
    .its('body')
    .then(response => {
      cy.setLocalStorage('token', response[0].LiveToken);
      cy.setLocalStorage('refresh_token', response[0].RefreshToken);
      cy.setLocalStorage(
        'MAX_USER_IDLE_TIME',
        Number(response[0].MaxIdleTimeForLogoff) * 90000,
      );
    });
});
