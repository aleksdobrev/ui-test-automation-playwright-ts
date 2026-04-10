import { test } from '@fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.visitPage();
  await loginPage.verifyLoginFormDefaultState();
});

test(
  'Login with valid credentials',
  { tag: ['@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.signInUser('standard_user', 'secret_sauce');
    await productsListPage.verifyProductsListPageIsOpened();
  },
);

test('Verify Login form mandatory fields', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser('', '');
  await loginPage.verifyLoginFormShowsErrorStateFor('Mandatory Fields');
});

test('Login with non-existing user', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser('non_existing_user', 'wrong_password');
  await loginPage.verifyLoginFormShowsErrorStateFor('Non-Existing User');
});

test('Login with locked out user', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser('locked_out_user', 'secret_sauce');
  await loginPage.verifyLoginFormShowsErrorStateFor('Locked-Out User');
});

test('Logout from application', { tag: ['@smoke', '@regression', '@login-page'] }, async ({ loginPage, productsListPage }) => {
  await loginPage.signInUser('standard_user', 'secret_sauce');
  await productsListPage.verifyProductsListPageIsOpened();
  await productsListPage.logout();
  await loginPage.verifyLoginFormDefaultState();
});
