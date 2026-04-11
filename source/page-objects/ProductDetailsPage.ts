import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';

export class ProductDetailsPage extends BasePage {
  readonly productDetailsPageUrl: string;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productDetailsPageUrl = '/inventory-item.html';
    this.productTitle = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.backToProductsButton = page.locator('button[data-test="back-to-products"]');
  }

  /**
   * Verify that the product details page has opened successfully by checking the URL, page title, and visibility of key elements on the page.
   */
  async verifyProductDetailsPageIsOpened() {
    // URL, page title, Back to products, verify title, description, price, Add to cart, photo

    await expect(this.page).toHaveURL(this.productDetailsPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await expect(this.productTitle).toBeVisible();
    await expect(this.productDescription).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.backToProductsButton).toBeVisible();
  }
}
