import { test } from '@fixtures';

test(
  'Complete product order',
  { tag: ['@smoke', '@regression', '@complete-order'] },
  async ({ productsListPage, shoppingCartPage, addressFormPage, orderOverviewPage, checkoutCompletePage }) => {
    await productsListPage.visitPage();
    const productDetails = await productsListPage.addRandomProductToCart();
    await shoppingCartPage.openShoppingCart();
    await shoppingCartPage.verifyProductIsVisibleInCart(productDetails);
    await shoppingCartPage.clickOnElement(shoppingCartPage.checkoutButton);
    await addressFormPage.verifyAddressFormIsVisible();
    await addressFormPage.fiiAddressForm();
    await addressFormPage.clickOnElement(addressFormPage.continueButton);
    await orderOverviewPage.verifyProductDetails(productDetails);
    await orderOverviewPage.clickOnElement(orderOverviewPage.finishButton);
    await checkoutCompletePage.verifyCheckoutCompleteScreenIsVisible();
  },
);
