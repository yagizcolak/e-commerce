// cypress/e2e/currency_selector.cy.ts

describe('Currency Selector Functionality', () => {
    beforeEach(() => {
        // Custom command for logging in
        cy.login('user', 'user123');
    });

    it('should change product prices when currency is changed', () => {

        // Navigate to a product detail page
        cy.get('[data-testid="view-details-button-1"]').click();

        // Verify default currency (e.g., USD)
        cy.get('[data-testid="currency-selector"]').should('have.value', 'USD');

        // Change currency to EUR
        cy.get('[data-testid="currency-selector"]').select('EUR');

        // Verify that the product price is displayed in EUR
        cy.get('[data-testid="product-price-detail"]').should('contain', '€');
    });
});