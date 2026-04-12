import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { BurgerMenuComponent } from '@page-objects/BurgerMenuComponent';
import { titles } from '@constants';
import { ProductDetails } from '@customTypes';

export class ProductsListPage extends BasePage {
  readonly burgerMenuComponent: BurgerMenuComponent;
  readonly productsListPageUrl: string;
  readonly pageLogo: Locator;
  readonly productsPageTitle: Locator;
  readonly burgerMenuButton: Locator;
  readonly productsList: Locator;
  readonly productTitle: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.burgerMenuComponent = new BurgerMenuComponent(page);
    this.productsListPageUrl = '/inventory.html';
    this.pageLogo = page.locator('.app_logo');
    this.productsPageTitle = page.locator('[data-test="title"]');
    this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.productsList = page.locator('div[data-test="inventory-container"]');
    this.productTitle = page.locator('div[data-test="inventory-item-name"]');
    this.productDescription = page.locator('div[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('div[data-test="inventory-item-price"]');
  }

  /**
   * Add a random product from the products list to the cart and return the details of the added product.
   * @returns An object containing the title, description, and price of the added product.
   */
  async addRandomProductToCart(): Promise<ProductDetails> {
    const productInfo = await this.getRandomProductInfo();
    await this.clickOnElement(this.addToCartButton.nth(productInfo.productIndex));
    return {
      productTitle: productInfo.productTitle,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
    };
  }

  /**
   * Log out from the application by opening the burger menu and clicking on the logout link.
   */
  async logout() {
    await this.verifyElementIsVisibleAndEnabled(this.burgerMenuButton);
    await this.clickOnElement(this.burgerMenuButton);
    await expect(this.burgerMenuComponent.burgerMenu).toBeVisible();
    await this.verifyElementIsVisibleAndEnabled(this.burgerMenuComponent.logoutLink);
    await this.clickOnElement(this.burgerMenuComponent.logoutLink);
  }

  /**
   * Open the details page of a random product from the products list and return the product details.
   * @returns An object containing the title, description, and price of the opened product.
   */
  async openRandomProductDetailsPage(): Promise<ProductDetails> {
    const productInfo = await this.getRandomProductInfo();
    await this.clickOnElement(this.productTitle.nth(productInfo.productIndex));
    return {
      productTitle: productInfo.productTitle,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
    };
  }

  /**
   * Navigate to the Products List page and verify that the page has loaded successfully.
   */
  async visitPage() {
    await this.page.goto(this.productsListPageUrl);
    await this.verifyProductsListPageIsOpened();
  }

  /**
   * Verify that the Products List page is opened by checking the visibility of key elements and the URL.
   */
  async verifyProductsListPageIsOpened() {
    await expect(this.pageLogo).toBeVisible();
    await expect(this.pageLogo).toHaveText(titles.swagLabsTitle);
    await expect(this.productsPageTitle).toBeVisible();
    await expect(this.productsPageTitle).toHaveText(titles.productsPageTitle);
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await expect(this.productsList).toBeVisible();
  }
}
