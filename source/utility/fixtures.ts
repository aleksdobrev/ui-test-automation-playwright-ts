import { test as base } from '@playwright/test';
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

export const test = base.extend<Fixtures>({
  addressFormPage: async ({ page }, use) => {
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
