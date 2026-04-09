import { type Page, type Locator, expect } from '@playwright/test';
import { titles } from '@constants';

export class ProductsListPage {
  readonly page: Page;
  readonly pageLogo: Locator;
  readonly productsPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageLogo = page.locator('.app_logo');
    this.productsPageTitle = page.locator('[data-test="title"]');
  }

  /**
   * Verify that the Products List page is opened by checking the visibility of key elements and the URL.
   */
  async verifyProductsListPageIsOpened() {
    await expect(this.pageLogo).toBeVisible();
    await expect(this.pageLogo).toHaveText(titles.swagLabsTitle);
    await expect(this.productsPageTitle).toBeVisible();
    await expect(this.productsPageTitle).toHaveText(titles.productsPageTitle);
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
  }
}
