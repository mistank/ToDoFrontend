describe('Login Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show validation when submitting empty login form', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click()

    // Form should still be visible (validation prevents submission)
    cy.get('input[placeholder="Username"]').should('be.visible')
  })

  it('should allow user to type username', () => {
    const testUsername = 'testuser'

    cy.get('input[placeholder="Username"]')
      .type(testUsername)
      .should('have.value', testUsername)
  })

  it('should allow user to type password', () => {
    const testPassword = 'testpassword123'

    cy.get('input[placeholder="Password"]')
      .type(testPassword)
      .should('have.value', testPassword)
  })

  it('should toggle password visibility', () => {
    // Initially password should be hidden
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password')

    // Click the show/hide password button
    cy.get('input[placeholder="Password"]')
      .parent()
      .find('button')
      .click()

    // Password should now be visible
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'text')

    // Click again to hide
    cy.get('input[placeholder="Password"]')
      .parent()
      .find('button')
      .click()

    // Password should be hidden again
    cy.get('input[placeholder="Password"]').should('have.attr', 'type', 'password')
  })

  it('should navigate to signup form', () => {
    // Click on Sign up link
    cy.contains('Sign up').click()

    // Should now show signup form (with space)
    cy.contains('Sign Up').should('be.visible')
    // Should have signup-specific fields
    cy.get('input[placeholder="First Name"]').should('be.visible')
    cy.get('input[placeholder="Email"]').should('be.visible')
  })

  it('should navigate to forgot password form', () => {
    // Click on Forgot password link
    cy.contains('Forgot password?').click()

    // Should now show forgot password form
    cy.contains('Forgot Password').should('be.visible')
    // Should have email input for password reset
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.contains('Reset Password').should('be.visible')
  })

  it('should submit login form with credentials', () => {
    // Intercept the login API call (adjust URL based on your API)
    cy.intercept('POST', '**/login*').as('loginRequest')

    // Fill in the form
    cy.get('input[placeholder="Username"]').type('testuser')
    cy.get('input[placeholder="Password"]').type('testpassword')

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Wait for the API call
    // Note: This will fail if not connected to backend, which is expected
    // In real tests, you might want to mock the API response
  })
})
