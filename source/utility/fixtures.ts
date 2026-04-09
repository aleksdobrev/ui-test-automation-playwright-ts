import { test as base } from '@playwright/test';
import { LoginPage } from '@page-objects/LoginPage';
import { ProductsListPage } from '@page-objects/ProductsListPage';

interface Fixtures {
  loginPage: LoginPage;
  productsListPage: ProductsListPage;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
});

export { expect } from '@playwright/test';
