import { type Locator, type Page, expect } from '@playwright/test';
import { ProductDetails } from '@customTypes';

export class BasePage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('div[data-test="inventory-item-name"]');
    this.productDescription = page.locator('div[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('div[data-test="inventory-item-price"]');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  /**
   * Click on the provided locator after ensuring it is visible and scrolled into view.
   * @param locator - The locator of the element to click on.
   */
  async clickOnElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  /**
   * Get the details of a random product from the products list.
   * @returns An object containing the title, description, price, and index of the random product.
   * The index can be used to interact with the same product in other methods (e.g., add to cart, open detail).
   */
  async getRandomProductInfo(): Promise<ProductDetails> {
    const [titles, descriptions, prices] = await Promise.all([
      this.productTitle.all(),
      this.productDescription.all(),
      this.productPrice.all(),
    ]);
    const index = Math.floor(Math.random() * titles.length);
    const [title, description, price] = await Promise.all([
      titles[index].innerText(),
      descriptions[index].innerText(),
      prices[index].innerText(),
    ]);
    return {
      productTitle: title,
      productDescription: description,
      productPrice: price,
      productIndex: index,
    };
  }

  /**
   * Fill the provided locator with the given value after ensuring it is visible and scrolled into view.
   * @param locator - The locator of the input field to fill.
   * @param value - The value to fill into the input field.
   */
  async fillInputField(locator: Locator, value: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
  }

  /**
   * Verify that an element is visible and enabled on the page.
   * @param locator - The locator of the element to verify.
   */
  async verifyElementIsVisibleAndEnabled(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
  }
}
