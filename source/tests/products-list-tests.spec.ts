import { test } from '@fixtures';

test(
  'Open details page of a random product @T148eb7f2',
  { tag: ['@T148eb7f2', '@smoke', '@regression', '@products-list', '@product-details'] },
  async ({ productsListPage, productDetailsPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.openRandomProductDetailsPage();
    await productDetailsPage.verifyProductDetailsPageIsOpened(productDetails);
  },
);
