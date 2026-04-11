import { test } from '@fixtures';

test(
  'Open details page of a random product',
  { tag: ['@smoke', '@regression', '@products-list', '@product-details'] },
  async ({ productsListPage, productDetailsPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.openRandomProductDetailsPage();
    await productDetailsPage.verifyProductDetailsPageIsOpened(productDetails);
  },
);
