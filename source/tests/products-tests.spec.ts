import { test } from '@fixtures';

test(
  'Open details page of a random product',
  { tag: ['@smoke', '@regression', '@products-list', '@product-details'] },
  async ({ productsListPage, productDetailsPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.openRandomProductDetailsPage();
    console.log(productDetails);
    await productDetailsPage.verifyProductDetailsPageIsOpened(productDetails);
  },
);
