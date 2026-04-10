import { type Locator, type Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
