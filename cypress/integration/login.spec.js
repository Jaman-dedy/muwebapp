describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should go to the Login page', () => {
    cy.location('pathname').should('eq', '/login');
  });
});
