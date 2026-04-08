import { type Page, type Locator, expect } from '@playwright/test';
import { titles } from '@constants';

export class LoginPage {
  readonly page: Page;
  readonly loginPageUrl: string;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPageUrl = '/';
    this.loginForm = page.locator('#login_button_container');
  }

  /**
   * Navigate to the Login page and verify that the page has loaded successfully.
   */
  async visitPage() {
    await this.page.goto(this.loginPageUrl);
    await expect(this.page).toHaveTitle(titles.loginPageTitle);
    await expect(this.loginForm).toBeVisible();
  }
}
