import { test } from '@fixtures';
import { users } from '@constants';

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ loginPage }) => {
  await loginPage.visitPage();
  await loginPage.verifyLoginFormDefaultState();
});

test(
  'Login with valid credentials @T52a793b0',
  { tag: ['@T52a793b0', '@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.signInUser(users.standardUser.username, users.standardUser.password);
    await productsListPage.verifyProductsListPageIsOpened();
  },
);

test(
  'Verify Login form mandatory fields @T96a05a5e',
  { tag: ['@T96a05a5e', '@regression', '@login-page'] },
  async ({ loginPage }) => {
    await loginPage.signInUser('', '');
    await loginPage.verifyLoginFormShowsErrorStateFor('Mandatory Fields');
  },
);

test('Login with non-existing user @T9c0f995e', { tag: ['@T9c0f995e', '@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser(users.nonExistingUser.username, users.nonExistingUser.password);
  await loginPage.verifyLoginFormShowsErrorStateFor('Non-Existing User');
});

test('Login with locked out user @T473d779f', { tag: ['@T473d779f', '@regression', '@login-page'] }, async ({ loginPage }) => {
  await loginPage.signInUser(users.lockedOutUser.username, users.lockedOutUser.password);
  await loginPage.verifyLoginFormShowsErrorStateFor('Locked-Out User');
});

test(
  'Logout from application @T84feaf19',
  { tag: ['@T84feaf19', '@smoke', '@regression', '@login-page'] },
  async ({ loginPage, productsListPage }) => {
    await loginPage.signInUser(users.standardUser.username, users.standardUser.password);
    await productsListPage.verifyProductsListPageIsOpened();
    await productsListPage.logout();
    await loginPage.verifyLoginFormDefaultState();
  },
);
