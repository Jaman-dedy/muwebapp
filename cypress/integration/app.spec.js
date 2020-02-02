describe('Home', () => {
  it('should go to the Home page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
  });
});
