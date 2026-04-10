import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';

export class LoginPage extends BasePage {
  readonly loginPageUrl: string;
  readonly loginForm: Locator;
  readonly userNameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;
  readonly userNameInputFieldErrorIcon: Locator;
  readonly passwordInputFieldErrorIcon: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginPageUrl = '/';
    this.loginForm = page.locator('#login_button_container');
    this.userNameInputField = page.locator('#user-name');
    this.passwordInputField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.userNameInputFieldErrorIcon = page.locator('#user-name + svg.error_icon');
    this.passwordInputFieldErrorIcon = page.locator('#password + svg.error_icon');
    this.errorMessage = page.locator('div.error-message-container.error');
  }

  /**
   * Sign in a user with the provided username and password.
   * @param username - The username of the user to sign in.
   * @param password - The password of the user to sign in.
   */
  async signInUser(username: string, password: string) {
    await this.fillInputField(this.userNameInputField, username);
    await this.fillInputField(this.passwordInputField, password);
    await this.clickOnElement(this.loginButton);
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

  /**
   * Verify that the appropriate error messages and indicators are visible when attempting to sign in with empty mandatory fields.
   */
  async verifyMandatoryFieldsErrorsAreVisible() {
    await expect(this.userNameInputField).toBeEmpty();
    await expect(this.passwordInputField).toBeEmpty();
    await expect(this.userNameInputField).toHaveClass('input_error form_input error');
    await expect(this.passwordInputField).toHaveClass('input_error form_input error');
    await expect(this.userNameInputFieldErrorIcon).toBeVisible();
    await expect(this.passwordInputFieldErrorIcon).toBeVisible();
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText('Epic sadface: Username is required');
  }
}
