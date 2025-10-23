// Import commands.js using ES2015 syntax:
import "./commands";
import "@testing-library/cypress/add-commands";

// Prevent Cypress from failing on uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // useful for third-party scripts that might throw errors
  return false;
});
