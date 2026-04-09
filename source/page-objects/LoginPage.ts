import { type Page, type Locator, expect } from '@playwright/test';
import { titles } from '@constants';

export class LoginPage {
  readonly page: Page;
  readonly loginPageUrl: string;
  readonly loginForm: Locator;
  readonly userNameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPageUrl = '/';
    this.loginForm = page.locator('#login_button_container');
    this.userNameInputField = page.locator('[data-test="username"]');
    this.passwordInputField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  /**
   * Sign in a user with the provided username and password.
   * @param username - The username of the user to sign in.
   * @param password - The password of the user to sign in.
   */
  async signInUser(username: string, password: string) {
    await this.userNameInputField.fill(username);
    await this.passwordInputField.fill(password);
    await this.loginButton.click();
    // TODO helper methods for click and fill.
  }

  /**
   * Navigate to the Login page and verify that the page has loaded successfully.
   */
  async visitPage() {
    await this.page.goto(this.loginPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await expect(this.loginForm).toBeVisible();
  }

  /**
   * Verify that the login form is in its default state, with all input fields and buttons visible and enabled.
   */
  async verifyLoginFormDefaultState() {
    const elements = [this.userNameInputField, this.passwordInputField, this.loginButton];
    for (const element of elements) {
      await expect(element).toBeVisible();
      await expect(element).toBeEnabled();
    }
    await expect(this.userNameInputField).toBeEmpty();
    await expect(this.passwordInputField).toBeEmpty();
  }
}
