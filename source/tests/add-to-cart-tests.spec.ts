import { test } from '@fixtures';

test(
  'Add random product to cart @T19c6d1d1',
  { tag: ['@T19c6d1d1', '@smoke', '@regression', '@add-to-cart'] },
  async ({ productsListPage, shoppingCartPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.addRandomProductToCart();
    await shoppingCartPage.openShoppingCart();
    await shoppingCartPage.verifyProductIsVisibleInCart(productDetails);
  },
);
