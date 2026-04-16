import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles, uiTexts } from '@constants';

export class CheckoutCompletePage extends BasePage {
  readonly backHomeButton: Locator;
  readonly successImage: Locator;
  readonly thankYouMessage: Locator;
  readonly orderDispatchedMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.successImage = page.getByRole('img', { name: 'Pony Express' });
    this.thankYouMessage = page.locator('h2[data-test="complete-header"]');
    this.orderDispatchedMessage = page.locator('div[data-test="complete-text"]');
  }

  /**
   * Verify that the Checkout complete screen is visible and all success messages are present.
   */
  async verifyCheckoutCompleteScreenIsVisible() {
    await expect(this.page).toHaveURL(this.checkoutCompletePageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await this.verifyElementIsVisibleAndHasText(this.pageTitle, titles.checkoutCompletePageTitle);
    await expect(this.successImage).toBeVisible();
    await this.verifyElementIsVisibleAndHasText(this.thankYouMessage, uiTexts.thankYouMessageText);
    await this.verifyElementIsVisibleAndHasText(this.orderDispatchedMessage, uiTexts.orderDispatchedMessageText);
    await this.verifyElementIsVisibleAndEnabled(this.backHomeButton);
  }
}
