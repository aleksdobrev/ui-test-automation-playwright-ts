import { test } from '@fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
  'Login with valid credentials',
  { tag: ['@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.visitPage();
    await loginPage.verifyLoginFromDefaultState();
    await loginPage.signInUser('standard_user', 'secret_sauce'); // TODO add env variables for credentials
    await productsListPage.verifyProductsListPageIsOpened();
  },
);
