import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';
import { ProductDetails } from '@customTypes';

export class ProductDetailsPage extends BasePage {
  readonly productDetailsPageUrl: RegExp;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsPageUrl = /inventory-item.html?id=/;
    this.productTitle = page.locator('div[data-test="inventory-item-name"]');
    this.productDescription = page.locator('div[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('div[data-test="inventory-item-price"]');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.backToProductsButton = page.getByRole('button', { name: 'Go back Back to products' });
  }

  /**
   * Verify that the product details page is opened.
   * Verify the correctness of the details of the opened product.
   * @param productDetails - An object containing the expected title, description, and price of the product.
   */
  async verifyProductDetailsPageIsOpened(productDetails: ProductDetails) {
    await expect(this.page).toHaveURL(this.productDetailsPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await this.verifyElementIsVisibleAndEnabled(this.backToProductsButton);
    await this.verifyElementIsVisibleAndEnabled(this.addToCartButton);
    const details = [
      { locator: this.productTitle, expectedText: productDetails.productTitle },
      { locator: this.productDescription, expectedText: productDetails.productDescription },
      { locator: this.productPrice, expectedText: productDetails.productPrice },
    ];
    for (const { locator, expectedText } of details) {
      await expect(locator).toBeVisible();
      await expect(locator).toHaveText(expectedText);
    }
  }
}
