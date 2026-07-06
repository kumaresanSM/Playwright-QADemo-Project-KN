import { checkoutData } from '../data/checkout.data';
import { standardUser } from '../data/credentials';
import { test } from '../fixtures/pages.fixture';

test.describe('QA Demo E2E', () => {
  test('standard user can login, checkout, and logout', async ({ orderPlacedPage }) => {
    await orderPlacedPage.gotoLogin();
    await orderPlacedPage.login(standardUser.username, standardUser.password);

    await orderPlacedPage.expectCatalogLoaded();
    await orderPlacedPage.openBluetoothSpeaker();
    await orderPlacedPage.addToCartAndViewCart();
    await orderPlacedPage.proceedToCheckout();
    await orderPlacedPage.completeCheckout(checkoutData);

    await orderPlacedPage.expectOrderConfirmed();
    await orderPlacedPage.continueShopping();

    await orderPlacedPage.logout();
    await orderPlacedPage.expectLoggedOut();
  });
});
