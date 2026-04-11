import { test as base } from '@playwright/test';
import { LoginPage } from '@page-objects/LoginPage';
import { ProductsListPage } from '@page-objects/ProductsListPage';
import { ProductDetailsPage } from '@page-objects/ProductDetailsPage';

interface Fixtures {
  loginPage: LoginPage;
  productsListPage: ProductsListPage;
  productDetailsPage: ProductDetailsPage;
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
});

export { expect } from '@playwright/test';
