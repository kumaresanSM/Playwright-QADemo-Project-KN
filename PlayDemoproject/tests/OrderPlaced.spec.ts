import { userDetailsData } from '../data/UserDetails.data';
import { standardUser } from '../data/credentials';
import { test } from '../fixtures/pages.fixture';

test.describe('QA Demo E2E', () => 
  {
  test('standard user can login, checkout, and logout', async ({ orderPlacedPage }) => 
    {
    await orderPlacedPage.placeOrderAndLogout(
      standardUser.username,
      standardUser.password,
      userDetailsData,
    );
  });
});
