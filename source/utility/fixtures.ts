import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@page-objects/LoginPage';
import { ProductsListPage } from '@page-objects/ProductsListPage';
import { ProductDetailsPage } from '@page-objects/ProductDetailsPage';
import { ShoppingCartPage } from '@page-objects/ShoppingCartPage';
import { AddressFormPage } from '@page-objects/AddressFormPage';
import { OrderOverviewPage } from '@page-objects/OrderOverviewPage';
import { CheckoutCompletePage } from '@page-objects/CheckoutCompletePage';

interface Fixtures {
  addressFormPage: AddressFormPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginPage: LoginPage;
  orderOverviewPage: OrderOverviewPage;
  productDetailsPage: ProductDetailsPage;
  productsListPage: ProductsListPage;
  shoppingCartPage: ShoppingCartPage;
}

interface Account {
  username: string;
  password: string;
}

export const test = base.extend<Fixtures, { signIn: Account }>({
  signIn: [
    async ({ browser }, use, workerInfo) => {
      // Unique username.
      const username = 'user' + workerInfo.workerIndex;
      const password = 'verysecure';

      // Create the account with Playwright.
      const page = await browser.newPage();
      await page.goto('/signup');
      await page.getByLabel('User Name').fill(username);
      await page.getByLabel('Password').fill(password);
      await page.getByText('Sign up').click();
      // Make sure everything is ok.
      await expect(page.getByTestId('result')).toHaveText('Success');
      // Do not forget to cleanup.
      await page.close();

      // Use the account value.
      await use({ username, password });
    },
    { scope: 'worker' },
  ],

  addressFormPage: async ({ page, signIn }, use) => {
    await signIn;
    await use(new AddressFormPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  orderOverviewPage: async ({ page }, use) => {
    await use(new OrderOverviewPage(page));
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
