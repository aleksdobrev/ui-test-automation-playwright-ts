import { test as setup } from '@fixtures';
import { users } from '@constants';
const authFile = 'auth.json';

setup('Authenticate', async ({ loginPage, page }) => {
  await loginPage.visitPage();
  await loginPage.signInUser(users.standardUser.username, users.standardUser.password);
  await page.context().storageState({ path: authFile });
});
