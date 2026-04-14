import { test } from '@fixtures';

// TODO check all tests step-by-step

test(
  'Add random product to cart',
  { tag: ['@smoke', '@regression', '@add-to-cart'] },
  async ({ productsListPage, shoppingCartPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.addRandomProductToCart();
    await shoppingCartPage.openShoppingCart();
    await shoppingCartPage.verifyProductIsVisibleInCart(productDetails);
  },
);
