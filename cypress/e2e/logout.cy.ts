// cypress/e2e/logout.cy.ts

describe('User Logout', () => {
    it('should log in and then log out successfully', () => {
        // Visit the login page
        cy.visit('/login');

        // Enter username
        cy.get('[data-testid="username-field"]').type('user');

        // Enter password
        cy.get('[data-testid="password-field"]').type('user123');

        // Click the Sign In button
        cy.get('[data-testid="submit-button"]').click();

        // Verify that the product list page is displayed
        cy.url().should('include', '/products');
        cy.contains('Denim Jacket with Zip'); // Adjust based on actual product names

        // Click on the first product's "View Details" button
        cy.get('[data-testid="view-details-button-2"]').click();

        // Verify that the product details page is displayed
        cy.url().should('match', /\/products\/\d+$/); // URL ends with /products/{id}
        cy.get('[data-testid="product-name"]').should('be.visible');

        // Verify that the logout button is visible
        cy.get('[data-testid="logout-button"]').should('be.visible');

        // Click the logout button
        cy.get('[data-testid="logout-button"]').click();

        // Verify that the user is redirected to the login page
        cy.url().should('include', '/login');
        cy.contains('Sign In').should('be.visible');
    });
});