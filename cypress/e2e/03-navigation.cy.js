describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate between login and signup forms', () => {
    // Start at login
    cy.contains('Login').should('be.visible')

    // Navigate to signup
    cy.contains('Sign up').click()
    cy.contains('Sign Up').should('be.visible')

    // Navigate back to login
    cy.contains('Login').click()
    cy.contains('Please enter your credentials to login').should('be.visible')
  })

  it('should maintain form state when toggling password visibility', () => {
    const testUsername = 'testuser'
    const testPassword = 'testpassword'

    // Fill in the form
    cy.get('input[placeholder="Username"]').type(testUsername)
    cy.get('input[placeholder="Password"]').type(testPassword)

    // Toggle password visibility
    cy.get('input[placeholder="Password"]')
      .parent()
      .find('button')
      .click()

    // Values should remain
    cy.get('input[placeholder="Username"]').should('have.value', testUsername)
    cy.get('input[placeholder="Password"]').should('have.value', testPassword)
  })

  it('should have proper responsive design on mobile viewport', () => {
    // Set mobile viewport
    cy.viewport('iphone-x')

    // Check if main elements are still visible
    cy.contains('Login').should('be.visible')
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
  })

  it('should have proper responsive design on tablet viewport', () => {
    // Set tablet viewport
    cy.viewport('ipad-2')

    // Check if main elements are still visible
    cy.contains('Login').should('be.visible')
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
  })
})
