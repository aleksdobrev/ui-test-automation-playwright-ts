import { test } from '@fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test(
  'Login with valid credentials',
  { tag: ['@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.visitPage();
    await loginPage.verifyLoginFormDefaultState();
    await loginPage.signInUser('standard_user', 'secret_sauce'); // TODO add env variables for credentials
    await productsListPage.verifyProductsListPageIsOpened();
  },
);

test('Verify Login form mandatory fields', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.visitPage();
  await loginPage.verifyLoginFormDefaultState();
  await loginPage.signInUser('', '');
  await loginPage.verifyMandatoryFieldsErrorsAreVisible();
});

test('Login with non-existing user', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.visitPage();
  await loginPage.verifyLoginFormDefaultState();
  await loginPage.signInUser('non_existing_user', 'wrong_password');
  await loginPage.verifyNonExistingUserErrorsAreVisible();
});
