// cypress/e2e/add_comment.cy.ts

describe('Add Comment to a Product', () => {
    it('should log in, navigate to product details, and add a comment', () => {
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

        // Click on a product's "View Details" button
        cy.get('[data-testid="view-details-button-1"]').click();

        // Verify that the product details page is displayed
        cy.url().should('match', /\/products\/\d+$/);
        cy.get('[data-testid="product-name"]').should('be.visible');

        // Switch to the COMMENTS tab
        cy.get('[data-testid="comments-tab"]').click();

        // Fill in the comment form
        cy.get('[data-testid="rating-input"]').click();
        cy.get('[data-testid="content-input"]').type('This is a test comment.');

        // Submit the comment
        cy.get('[data-testid="submit-button"]').click();

        // Verify that the new comment appears
        cy.contains('This is a test comment.').should('be.visible');
    });
});