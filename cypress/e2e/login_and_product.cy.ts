// cypress/e2e/login_and_product.cy.ts

describe('User Login and Product Navigation', () => {
    it('should log in and navigate to product details', () => {
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
        cy.contains('Check Pocket Overshirt'); // Adjust based on actual product names

        // Click on the first product's "View Details" button
        cy.get('[data-testid="view-details-button-1"]').click();

        // Verify that the product details page is displayed
        cy.url().should('match', /\/products\/\d+$/); // URL ends with /products/{id}
        cy.get('[data-testid="product-name"]').should('be.visible');
    });
});