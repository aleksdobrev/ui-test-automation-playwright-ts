import { test as base } from '@playwright/test';
import { LoginPage } from '@page-objects/LoginPage';
import { ProductsListPage } from '@page-objects/ProductsListPage';
import { ProductDetailsPage } from '@page-objects/ProductDetailsPage';
import { ShoppingCartPage } from '@page-objects/ShoppingCartPage';

interface Fixtures {
  loginPage: LoginPage;
  productDetailsPage: ProductDetailsPage;
  productsListPage: ProductsListPage;
  shoppingCartPage: ShoppingCartPage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect } from '@playwright/test';
