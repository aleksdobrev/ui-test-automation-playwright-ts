import { test as setup } from '@fixtures';

const authFile = 'auth.json';

setup('Authenticate', async ({ loginPage, page }) => {
  await loginPage.visitPage();
  await loginPage.signInUser('standard_user', 'secret_sauce');
  await page.context().storageState({ path: authFile });
});
