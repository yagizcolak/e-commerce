// cypress/e2e/dark_mode_toggle.cy.ts

describe('Dark Mode Toggle Functionality', () => {
    beforeEach(() => {
        // Custom command for logging in
        cy.login('user', 'user123');
    });

    it('should toggle the theme when dark mode button is clicked', () => {
        // Navigate to a product detail page
        cy.get('[data-testid="view-details-button-2"]').click();

        // Retrieve the initial color mode from sessionStorage
        cy.window().then((window) => {
            const initialTheme = window.sessionStorage.getItem('colorMode');

            // Click the dark mode toggle button
            cy.get('[data-testid="dark-mode-button"]').click();

            // Verify that the color mode in sessionStorage has changed
            cy.window().should((window) => {
                const newTheme = window.sessionStorage.getItem('colorMode');
                expect(newTheme).not.to.eq(initialTheme);
            });
        });
    });
});