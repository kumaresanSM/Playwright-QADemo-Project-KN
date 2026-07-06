import { test as base } from '@playwright/test';
import { OrderPlacedPage } from '../pages/OrderPlacedPage';

type PageFixtures = {
  orderPlacedPage: OrderPlacedPage;
};

export const test = base.extend<PageFixtures>({
  orderPlacedPage: async ({ page }, use) => {
    await use(new OrderPlacedPage(page));
  },
});

export { expect } from '@playwright/test';
