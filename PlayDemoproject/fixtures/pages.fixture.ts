import { test as base } from '@playwright/test';
import { OrderPlacedPageEle } from '../pages/OrderPlacedPageEle';

type PageFixtures = 
{
  orderPlacedPage: OrderPlacedPageEle;
};

export const test = base.extend<PageFixtures>(
{
  orderPlacedPage: async ({ page }, use) => 
  {
    await use(new OrderPlacedPageEle(page));
  },
});

export { expect } from '@playwright/test';