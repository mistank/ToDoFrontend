# Cypress Testing Guide

This project now includes Cypress for E2E (end-to-end) testing.

## Installation

Cypress and all required dependencies have been installed. If you need to reinstall:

```bash
npm install
```

## Running Tests

### Open Cypress Test Runner (Interactive Mode)

This opens the Cypress UI where you can see tests running in real-time:

```bash
npm run cypress:open
```

Or to automatically start the dev server and open Cypress:

```bash
npm run test:e2e:open
```

### Run Tests in Headless Mode

Run all tests in the terminal without opening the browser UI:

```bash
npm run cypress:run
```

Run tests in specific browsers:

```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

Run tests with dev server automatically started:

```bash
npm run test:e2e
```

## Test Structure

Tests are located in the `cypress/e2e/` directory:

- `01-homepage.cy.js` - Tests for homepage loading and basic elements
- `02-login.cy.js` - Tests for login functionality
- `03-navigation.cy.js` - Tests for navigation between pages
- `04-accessibility.cy.js` - Basic accessibility tests
- `05-input-validation.cy.js` - Comprehensive input validation and security tests
  - Login form validation
  - Signup form validation (email format, password matching, required fields)
  - Forgot password form validation
  - XSS and SQL injection safety tests
  - Character limit tests

## Custom Commands

Custom Cypress commands are defined in `cypress/support/commands.js`:

- `cy.login(email, password)` - Helper command to log in
- `cy.setLocalStorage(key, value)` - Set localStorage items
- `cy.getLocalStorage(key)` - Get localStorage items
- `cy.waitForApiResponse(alias, timeout)` - Wait for API responses

## Configuration

Cypress configuration is in `cypress.config.js`. Current settings:

- Base URL: `http://localhost:5173` (Vite dev server)
- Viewport: 1280x720
- Videos: Disabled (to save space)
- Screenshots: Enabled on test failure

## Writing New Tests

1. Create a new file in `cypress/e2e/` with the pattern `*.cy.js`
2. Use the following template:

```javascript
describe('Test Suite Name', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should do something', () => {
    // Your test code here
    cy.get('selector').should('be.visible')
  })
})
```

## Best Practices

1. **Use data-cy attributes**: Add `data-cy="element-name"` to elements you want to test
2. **Don't test external services**: Mock API calls using `cy.intercept()`
3. **Keep tests independent**: Each test should work in isolation
4. **Use meaningful descriptions**: Test names should clearly describe what they test
5. **Clean up after tests**: Reset state between tests using `beforeEach()` and `afterEach()`

## Useful Cypress Commands

- `cy.visit(url)` - Navigate to a URL
- `cy.get(selector)` - Get DOM elements
- `cy.contains(text)` - Find elements containing text
- `cy.click()` - Click an element
- `cy.type(text)` - Type into an input
- `cy.should(assertion)` - Make an assertion
- `cy.intercept(method, url)` - Intercept network requests
- `cy.viewport(width, height)` - Set viewport size

## Debugging Tests

1. Use `.debug()` to pause test execution:
   ```javascript
   cy.get('button').debug()
   ```

2. Use `.pause()` to pause and inspect:
   ```javascript
   cy.get('button').pause()
   ```

3. Take screenshots:
   ```javascript
   cy.screenshot('my-screenshot')
   ```

## CI/CD Integration

To run Cypress in CI/CD pipelines:

```bash
npm run test:e2e
```

This will start the dev server, run all tests, and exit with the appropriate status code.

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Example Recipes](https://github.com/cypress-io/cypress-example-recipes)
