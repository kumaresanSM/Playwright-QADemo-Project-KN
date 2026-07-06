import { expect, type Locator, type Page } from '@playwright/test';
import { LOGIN_URL } from '../data/urls';

type CheckoutDetails = {
  firstName: string;
  lastName: string;
  address: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
};

export class OrderPlacedPage {
  readonly page: Page;

  // Login
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  // Catalog
  readonly productCatalogHeading: Locator;
  readonly bluetoothSpeakerHeading: Locator;
  readonly bluetoothSpeakerImage: Locator;

  // Product
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;

  // Cart
  readonly proceedToCheckoutButton: Locator;

  // Checkout
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cardNumberInput: Locator;
  readonly expiryInput: Locator;
  readonly cvvInput: Locator;
  readonly cardholderNameInput: Locator;
  readonly placeOrderButton: Locator;

  // Order confirmation
  readonly orderConfirmedHeading: Locator;
  readonly continueShoppingButton: Locator;

  // Logout
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
    this.bluetoothSpeakerHeading = page.getByRole('heading', { name: 'Bluetooth Speaker' });
    this.bluetoothSpeakerImage = page.locator(
      'xpath=//*[@id="root"]/div/main/div/div/div[2]/div[1]/a/div/div[1]/img',
    );

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
    this.cardholderNameInput = page.locator('xpath=//*[@data-testid="checkout-cardholder-name"]');
    this.placeOrderButton = page.locator('xpath=//*[@data-testid="place-order-button"]');

    this.orderConfirmedHeading = page.getByRole('heading', { name: 'Order Confirmed!' });
    this.continueShoppingButton = page.locator(
      'xpath=//*[@id="root"]/div/main/div/div/div[2]/div[4]/a/button',
    );

    this.logoutIcon = page.locator('xpath=//*[@class="lucide lucide-log-out w-4 h-4"]');
    this.signInLink = page.getByRole('link', { name: 'Sign In' }).first();
  }

  async gotoLogin() {
    await this.page.goto(LOGIN_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectCatalogLoaded() {
    await expect(this.page).toHaveURL(/\/catalog/);
    await expect(this.productCatalogHeading).toBeVisible();
  }

  async openBluetoothSpeaker() {
    await expect(this.bluetoothSpeakerHeading).toBeVisible();
    await this.bluetoothSpeakerImage.click();
    await expect(this.bluetoothSpeakerHeading).toBeVisible();
  }

  async addToCartAndViewCart() {
    await this.addToCartButton.click();
    await this.viewCartButton.click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async completeCheckout(details: CheckoutDetails) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.expiryInput.fill(details.expiry);
    await this.cvvInput.fill(details.cvv);
    await this.cardholderNameInput.fill(details.cardholderName);
    await this.placeOrderButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.orderConfirmedHeading).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async logout() {
    await this.logoutIcon.click();
  }

  async expectLoggedOut() {
    await expect(this.signInLink).toBeVisible();
  }
}
