import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';
import { ProductDetails } from '@customTypes';

export class ShoppingCartPage extends BasePage {
  readonly shoppingCartPageUrl: string;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly productItem: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartPageUrl = '/cart.html';
    this.continueShoppingButton = page.getByRole('button', { name: 'Go back Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.productItem = page.locator('div[data-test="inventory-item"]');
    this.productTitle = page.locator('div[data-test="inventory-item"] a');
    this.productDescription = page.locator('div[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('div[data-test="inventory-item-price"]');
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

  /**
   * Verify that the product with the provided details is visible in the shopping cart.
   * @param productDetails - An object containing the details of the product to verify in the cart.
   */
  async verifyProductIsVisibleInCart(productDetails: ProductDetails) {
    await expect(this.productItem).toBeVisible();
    await expect(this.productTitle).toBeVisible(); // TODO helper visible and text
    await expect(this.productTitle).toHaveText(productDetails.productTitle);
    await expect(this.productDescription).toBeVisible();
    await expect(this.productDescription).toHaveText(productDetails.productDescription);
    await expect(this.productPrice).toBeVisible();
    await expect(this.productPrice).toHaveText(productDetails.productPrice);
    await this.verifyElementIsVisibleAndEnabled(this.removeButton);
  }
}
