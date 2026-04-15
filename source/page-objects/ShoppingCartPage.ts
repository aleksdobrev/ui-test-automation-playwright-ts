import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';
import { ProductDetails } from '@customTypes';

export class ShoppingCartPage extends BasePage {
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.continueShoppingButton = page.getByRole('button', { name: 'Go back Continue Shopping' });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.productTitle = page.locator('div[data-test="inventory-item"] a');
    this.productDescription = page.locator('div[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('div[data-test="inventory-item-price"]');
  }

  /**
   * Navigate back to the products list page by clicking on the continue shopping button and verify that the navigation is successful.
   */
  async navigateBackToProductsList() {
    await this.clickOnElement(this.continueShoppingButton);
    await expect(this.page).toHaveURL(this.productsListPageUrl);
    await this.verifyElementIsVisibleAndHasText(this.pageTitle, titles.productsPageTitle);
  }

  /**
   * Open the shopping cart page by clicking on the shopping cart link and verify that the page is loaded successfully by checking its elements.
   */
  async openShoppingCart() {
    await this.clickOnElement(this.shoppingCartLink);
    await expect(this.page).toHaveURL(this.shoppingCartPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await this.verifyElementIsVisibleAndHasText(this.pageTitle, titles.shoppingCartPageTitle);
    await this.verifyElementIsVisibleAndEnabled(this.continueShoppingButton);
    await this.verifyElementIsVisibleAndEnabled(this.checkoutButton);
  }

  /**
   * Verify that the product with the provided details is visible in the shopping cart.
   * @param productDetails - An object containing the details of the product to verify in the cart.
   */
  async verifyProductIsVisibleInCart(productDetails: ProductDetails) {
    await expect(this.productItem).toBeVisible();
    await this.verifyElementIsVisibleAndHasText(this.productTitle, productDetails.productTitle);
    await this.verifyElementIsVisibleAndHasText(this.productDescription, productDetails.productDescription);
    await this.verifyElementIsVisibleAndHasText(this.productPrice, productDetails.productPrice);
    await this.verifyElementIsVisibleAndEnabled(this.removeButton);
  }
}
