import { test } from '@fixtures';
import { users } from '@constants';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.visitPage();
  await loginPage.verifyLoginFormDefaultState();
});

test(
  'Login with valid credentials',
  { tag: ['@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.signInUser(users.standardUser.username, users.standardUser.password);
    await productsListPage.verifyProductsListPageIsOpened();
  },
);

test('Verify Login form mandatory fields', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser('', '');
  await loginPage.verifyLoginFormShowsErrorStateFor('Mandatory Fields');
});

test('Login with non-existing user', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser(users.nonExistingUser.username, users.nonExistingUser.password);
  await loginPage.verifyLoginFormShowsErrorStateFor('Non-Existing User');
});

test('Login with locked out user', { tag: ['@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser(users.lockedOutUser.username, users.lockedOutUser.password);
  await loginPage.verifyLoginFormShowsErrorStateFor('Locked-Out User');
});

test('Logout from application', { tag: ['@smoke', '@regression', '@login-page'] }, async ({ loginPage, productsListPage }) => {
  await loginPage.signInUser(users.standardUser.username, users.standardUser.password);
  await productsListPage.verifyProductsListPageIsOpened();
  await productsListPage.logout();
  await loginPage.verifyLoginFormDefaultState();
});
