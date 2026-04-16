import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';
import { titles } from '@constants';
import { faker } from '@faker-js/faker';
import { ClientDetails } from '@customTypes';

export class AddressFormPage extends BasePage {
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly postalCodeInputField: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.lastNameInputField = page.getByPlaceholder('Last Name');
    this.postalCodeInputField = page.getByPlaceholder('Zip/Postal Code');
  }

  /**
   * Fills the Address Form with random client details.
   * @returns - The details of the client
   */
  async fiiAddressForm(): Promise<ClientDetails> {
    const firstName = await faker.person.firstName();
    await this.firstNameInputField.fill(firstName);
    const lastName = await faker.person.lastName();
    await this.lastNameInputField.fill(lastName);
    const postCode = await faker.location.zipCode();
    await this.postalCodeInputField.fill(postCode);
    return {
      firstName,
      lastName,
      postCode,
    };
  }

  /**
   * Verify address form is opened by checking its elements and their default state.
   */
  async verifyAddressFormIsVisible() {
    await expect(this.page).toHaveURL(this.addressFormPageUrl);
    await expect(this.page).toHaveTitle(titles.swagLabsTitle);
    await this.verifyElementIsVisibleAndHasText(this.pageTitle, titles.addressFormPageTitle);
    await this.verifyElementIsVisibleAndEnabled(this.cancelButton);
    await this.verifyElementIsVisibleAndEnabled(this.continueButton);
    const formFields = [this.firstNameInputField, this.lastNameInputField, this.postalCodeInputField];
    for (const field of formFields) {
      await this.verifyElementIsVisibleAndEnabled(field);
      await expect(field).toBeEmpty();
    }
  }
}
