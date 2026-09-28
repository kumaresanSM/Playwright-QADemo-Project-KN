import { expect, type Locator, type Page } from '@playwright/test';
import { LOGIN_URL } from '../data/urls';
import type { UserDetails } from '../data/UserDetails.data';

export class OrderPlacedPageEle {
  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly productCatalogHeading: Locator;
  readonly bluetoothSpeakerName: Locator;
  readonly bluetoothSpeakerHeading: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly cardholderNameInput: Locator;
  readonly placeOrderButton: Locator;
  readonly orderConfirmedHeading: Locator;
  readonly continueShoppingButton: Locator;
  readonly logoutIcon: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('xpath=//*[@id="username"]');
    this.passwordInput = page.locator('xpath=//*[@id="password"]');
    this.signInButton = page.locator(
      'xpath=//*[@id="root"]/div/main/div/div/div[2]/div/form/button',
    );
    this.productCatalogHeading = page.getByRole('heading', { name: 'Product Catalog' });
    this.bluetoothSpeakerName = page.locator('xpath=//*[@data-testid="product-name-4"]');
    this.bluetoothSpeakerHeading = page.getByRole('heading', { name: 'Bluetooth Speaker' });
    this.addToCartButton = page.locator('xpath=//*[@data-testid="product-add-to-cart-button"]');
    this.viewCartButton = page.locator('xpath=//*[@data-testid="product-view-cart-button"]');
    this.proceedToCheckoutButton = page.locator(
      'xpath=//*[@data-testid="proceed-to-checkout-button"]',
    );
    this.firstNameInput = page.locator('xpath=//*[@data-testid="checkout-first-name"]');
    this.lastNameInput = page.locator('xpath=//*[@data-testid="checkout-last-name"]');
    this.addressInput = page.locator('xpath=//*[@data-testid="checkout-address"]');
    this.cardNumberInput = page.locator('xpath=//*[@id="cardNumber"]');
    this.expiryInput = page.locator('xpath=//*[@data-testid="checkout-expiry"]');
    this.cvvInput = page.locator('xpath=//*[@data-testid="checkout-cvv"]');
    this.cardholderNameInput = page.locator(
      'xpath=//*[@data-testid="checkout-cardholder-name"]',
    );
    this.placeOrderButton = page.locator('xpath=//*[@data-testid="place-order-button"]');
    this.orderConfirmedHeading = page.getByRole('heading', { name: 'Order Confirmed!' });
    this.continueShoppingButton = page.locator(
      'xpath=//*[@id="root"]/div/main/div/div/div[2]/div[4]/a/button',
    );
    this.logoutIcon = page.locator('xpath=//*[@class="lucide lucide-log-out w-4 h-4"]');
    this.signInLink = page.getByRole('link', { name: 'Sign In' }).first();
  }

  async placeOrderAndLogout(username: string, password: string, details: UserDetails) {
    await this.page.goto(LOGIN_URL);

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    await expect(this.page).toHaveURL(/\/catalog/);
    await expect(this.productCatalogHeading).toBeVisible();

    await this.bluetoothSpeakerName.click();
    await expect(this.bluetoothSpeakerHeading).toBeVisible();

    await this.addToCartButton.click();
    await this.viewCartButton.click();

    await this.proceedToCheckoutButton.click();

    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.expiryInput.fill(details.expiry);
    await this.cvvInput.fill(details.cvv);
    await this.cardholderNameInput.fill(details.cardholderName);

    await this.placeOrderButton.click();
    await expect(this.orderConfirmedHeading).toBeVisible();

    await this.continueShoppingButton.click();

    await this.logoutIcon.click();
    await expect(this.signInLink).toBeVisible();
  }
}
