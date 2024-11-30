// cypress/e2e/access_control.cy.ts

describe('Access Control', () => {
    it('should redirect unauthenticated user to login page', () => {
        // Visit a protected route
        cy.visit('/products');

        // Verify that the user is redirected to the login page
        cy.url().should('include', '/login');
        cy.contains('Sign In').should('be.visible');
    });
});