// cypress/e2e/user_flow.cy.ts

describe('User Flow Test', () => {
    it('should perform a complete user flow including login, navigation, commenting, and logout', () => {
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
        cy.contains('Check Pocket Overshirt');

        // Click on the first product's "View Details" button
        cy.get('[data-testid="view-details-button-1"]').click();

        // Verify that the product details page is displayed
        cy.url().should('match', /\/products\/\d+$/);
        cy.get('[data-testid="product-name"]').should('be.visible');

        // Change currency to EUR
        cy.get('[data-testid="currency-selector"]').select('EUR');

        // Verify that the product price is displayed in EUR
        cy.get('[data-testid="product-price-detail"]').should('contain', '€');

        // Switch to the COMMENTS tab
        cy.get('[data-testid="comments-tab"]').click();

        // Fill in the comment form
        cy.get('[data-testid="rating-input"]').click();
        cy.get('[data-testid="content-input"]').type('This is my first test comment.');

        // Submit the comment
        cy.get('[data-testid="submit-button"]').click();

        // Verify that the new comment appears
        cy.contains('This is my first test comment.').should('be.visible');

        // Go back to the products page
        cy.get('[data-testid="home-button"]').click();

        // Toggle dark mode
        cy.get('[data-testid="dark-mode-button"]').click();

        // Visit another product's detail page
        cy.get('[data-testid="view-details-button-2"]').click();

        // Verify that the product details page is displayed
        cy.url().should('match', /\/products\/\d+$/);
        cy.get('[data-testid="product-name"]').should('be.visible');

        // Switch to the COMMENTS tab
        cy.get('[data-testid="comments-tab"]').click();

        // Fill in the comment form
        cy.get('[data-testid="rating-input"]').click();
        cy.get('[data-testid="content-input"]').type('This is my second test comment.');

        // Submit the comment
        cy.get('[data-testid="submit-button"]').click();

        // Verify that the new comment appears
        cy.contains('This is my second test comment.').should('be.visible');

        // Go back to the products page
        cy.get('[data-testid="home-button"]').click();

        // Log out
        cy.get('[data-testid="logout-button"]').click();

        // Verify that the user is redirected to the login page
        cy.url().should('include', '/login');
        cy.contains('Sign In').should('be.visible');
    });
});