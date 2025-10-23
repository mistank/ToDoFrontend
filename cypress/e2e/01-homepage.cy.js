describe('Homepage Tests', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    // Check if the page loads and contains expected elements
    cy.get('#root').should('exist')
  })

  it('should display the correct page title', () => {
    // Verify the page title
    cy.title().should('eq', 'Octom')
  })

  it('should have a login form visible', () => {
    // Check if login form elements are present
    cy.contains('Login').should('be.visible')
    cy.get('input[placeholder="Username"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should have a sign up link', () => {
    // Check if sign up link is present
    cy.contains('Sign up').should('be.visible')
  })

  it('should have a forgot password link', () => {
    // Check if forgot password link is present
    cy.contains('Forgot password?').should('be.visible')
  })

  it('should have Google sign in option', () => {
    // Check if Google sign in button is present
    cy.get('button').find('img[alt=""]').should('exist')
  })
})
