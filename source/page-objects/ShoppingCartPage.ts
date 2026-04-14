import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';

export class ShoppingCartPage extends BasePage {
  readonly shoppingCartPageUrl: string;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.shoppingCartPageUrl = '/cart.html';
    this.cartItems = page.locator('div.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }
}
