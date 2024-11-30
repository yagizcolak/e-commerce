Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-testid="username-field"]').type(username);
    cy.get('[data-testid="password-field"]').type(password);
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should('include', '/products');
});