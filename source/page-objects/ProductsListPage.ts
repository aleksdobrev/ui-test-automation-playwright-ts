import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { BurgerMenuComponent } from '@page-objects/BurgerMenuComponent';
import { titles } from '@constants';

export class ProductsListPage extends BasePage {
  readonly burgerMenuComponent: BurgerMenuComponent;
  readonly productsListPageUrl: string;
  readonly pageLogo: Locator;
  readonly productsPageTitle: Locator;
  readonly burgerMenuButton: Locator;
  readonly productsList: Locator;

  constructor(page: Page) {
    super(page);
    this.burgerMenuComponent = new BurgerMenuComponent(page);
    this.productsListPageUrl = '/inventory.html';
    this.pageLogo = page.locator('.app_logo');
    this.productsPageTitle = page.locator('[data-test="title"]');
    this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.productsList = page.locator('div[data-test="inventory-container"]');
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
