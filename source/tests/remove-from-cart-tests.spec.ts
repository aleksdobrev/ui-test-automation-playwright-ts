import { test } from '@fixtures';

test(
  'Remove product from cart via Products list page',
  { tag: ['@smoke', '@regression', '@remove-from-cart'] },
  async ({ productsListPage, shoppingCartPage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.addRandomProductToCart();
    await shoppingCartPage.openShoppingCart();
    await shoppingCartPage.verifyProductIsVisibleInCart(productDetails);
    await shoppingCartPage.navigateBackToProductsList();
    await productsListPage.removeProductFromCartByName(productDetails.productTitle);
    await shoppingCartPage.verifyProductIsNotInShoppingCart(productDetails.productTitle);
  },
);
