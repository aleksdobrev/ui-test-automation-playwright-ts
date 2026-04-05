# UI Test Automation - Playwright + TypeScript

A comprehensive end-to-end test automation framework built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/), following the Page Object Model (POM) design pattern for maintainability and scalability.

## 📋 Table of Contents

- [Overview](#-overview)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Running Tests](#-running-tests)
- [Best Practices](#-best-practices)
- [Test Reporting](#-test-reporting)
- [GitHub Actions](#-github-actions)

## 🎯 Overview

This test automation framework is designed to validate UI functionality across multiple browsers (Chromium, Firefox, WebKit) with:

- **Page Object Model**: Encapsulates page elements and actions for better maintainability
- **Custom Fixtures**: Pre-configured page objects for rapid test development
- **Multi-browser Support**: Cross-browser testing out of the box
- **Comprehensive Reporting**: HTML, JUnit XML, and JSON test reports

## ✅ Prerequisites

- **Node.js**: v18+ recommended
- **npm**: v8 or higher
- **Git**: For version control

## 🚀 Installation

1. **Install dependencies**

   ```
   npm install
   ```

2. **Install Playwright** (if not automatically installed)

   ```
   npm init playwright@latest
   ```

## 📁 Project Structure

```
.
├── source/
│   ├── page-objects/       # Page Object classes (POM)
│   │   ├── LoginPage.ts
│   │   ├── BasePage.ts
│   │   └── [Feature]Page.ts
│   ├── tests/              # Test specifications
│   │   └── example.spec.ts
│   └── utility/
│       ├── helpers.ts      # Utility functions
│       ├── constants.ts    # Test constants
│       └── data/           # Test data files
├── env/                    # Environment configuration
├── playwright-report/      # Detailed HTML test report. Content is updated after each test run.
├── test-results/           # Test execution reports. Content is updated after each test run.
|
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

### Key Directories Explained

| Directory              | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `source/page-objects/` | Page Object classes for UI pages and components |
| `source/tests/`        | Test specifications and scenarios               |
| `source/utility/`      | Helper functions, constants, and test data      |
| `env/`                 | Environment-specific configuration files        |
| `test-results/`        | Test execution reports (HTML, JUnit XML, JSON)  |
| `playwright-report/`   | Detailed HTML test report                       |

## 🧪 Running Tests

### All Tests (All Browsers)

```zsh
npm test
```

### Specific Browser

```zsh
npm run test:chrome    # Chromium browser
npm run test:firefox   # Firefox browser
npm run test:safari    # WebKit browser
```

### Single Test File

```zsh
npx playwright test path/to/test.spec.ts
```

### Single Test by Name

```zsh
npx playwright test -g "test name pattern"
```

### With Debug Mode

```zsh
npx playwright test --debug
```

### With UI Mode (interactive)

```zsh
npx playwright test --ui
```

### View Test Report

```zsh
npm run report
```

## 🎓 Best Practices

### 1. **Use Page Objects Consistently**

- Encapsulate all selectors and interactions within page classes
- Never access DOM elements directly in tests
- Keep page objects focused and single-purpose

### 2. **Avoid Hard-coded Wait Times**

```typescript
// ❌ Don't do this
await page.waitForTimeout(5000);

// ✅ Do this instead
await page.waitForLoadState('networkidle');
await expect(locator).toBeVisible();
```

### 3. **Use Strong Assertions**

```typescript
// ❌ Weak assertion
await page.locator('button').click();

// ✅ Strong assertion
await expect(page.locator('button')).toBeVisible();
await page.locator('button').click();
```

### 4. **Use Meaningful Test Names**

```typescript
// ❌ Poor
test('test 1', async () => { ... });

// ✅ Good
test('should successfully login with valid credentials and redirect to dashboard', async () => { ... });
```

### 5. **Use test.beforeEach and test.afterEach Hooks**

Setup and teardown logic in hooks keeps tests clean:

```typescript
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
});

test.afterEach(async ({ page }) => {
  // Cleanup if needed
  await page.context().clearCookies();
});
```

## 📊 Test Reporting

The framework generates multiple report formats automatically:

### HTML Report (Interactive)

- **Location**: `playwright-report/index.html`
- **View**: `npm run report`
- Features: Step-by-step screenshots, timing, retries

### JUnit XML Report

- **Location**: `test-results/junit-results.xml`
- **Use Case**: CI/CD integration, Jenkins, Azure Pipelines

### JSON Report

- **Location**: `test-results/json-results.json`
- **Use Case**: Custom dashboards, result parsing

## 🔄 GitHub Actions

_GitHub Actions configuration to be added._

## 📚 Additional Resources

- [Playwright Official Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Configuration](https://playwright.dev/docs/test-configuration)
