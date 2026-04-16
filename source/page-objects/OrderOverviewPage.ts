import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { ProductDetails } from '@customTypes';

export class OrderOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Verify that the product with the provided details is visible in the order overview page.
   * @param productDetails - An object containing the details of the product to verify.
   */
  async verifyProductDetails(productDetails: ProductDetails) {
    await expect(this.productItem).toBeVisible();
    await this.verifyElementIsVisibleAndHasText(this.productTitle, productDetails.productTitle);
    await this.verifyElementIsVisibleAndHasText(this.productDescription, productDetails.productDescription);
    await this.verifyElementIsVisibleAndHasText(this.productPrice, productDetails.productPrice);
  }
}
