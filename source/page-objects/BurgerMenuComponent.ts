import { type Page, type Locator } from '@playwright/test';

export class BurgerMenuComponent {
  readonly page: Page;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenu = page.locator('div.bm-menu-wrap');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }
}
