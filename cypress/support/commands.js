// Custom commands for your application

// Example login command
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// Example command to set local storage
Cypress.Commands.add('setLocalStorage', (key, value) => {
  cy.window().then((window) => {
    window.localStorage.setItem(key, value)
  })
})

// Example command to get local storage
Cypress.Commands.add('getLocalStorage', (key) => {
  cy.window().then((window) => {
    return window.localStorage.getItem(key)
  })
})

// Command to wait for API response
Cypress.Commands.add('waitForApiResponse', (alias, timeout = 10000) => {
  cy.wait(alias, { timeout })
})
