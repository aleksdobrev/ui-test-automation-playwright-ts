import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';

export class ShoppingCartPage extends BasePage {
  readonly shoppingCartPageUrl: string;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartPageUrl = '/cart.html';
    this.continueShoppingButton = page.getByRole('button', { name: 'Go back Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  /**
   * Open the shopping cart page by clicking on the shopping cart link and verify that the page is loaded successfully by checking its elements.
   */
  async openShoppingCart() {
    await this.clickOnElement(this.shoppingCartLink);
    await expect(this.page).toHaveURL(this.shoppingCartPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(titles.shoppingCartPageTitle);
    await this.verifyElementIsVisibleAndEnabled(this.continueShoppingButton);
    await this.verifyElementIsVisibleAndEnabled(this.checkoutButton);
  }
}
