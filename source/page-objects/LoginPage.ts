import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginPageUrl: string;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPageUrl = '/';
    this.loginForm = page.locator('#login_button_container');
  }

  async visitPage() {
    await this.page.goto(this.loginPageUrl);
    await expect(this.page).toHaveTitle('Swag Labs'); // constants
    await expect(this.loginForm).toBeVisible();
  }
}
