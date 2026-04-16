import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from '@page-objects/BasePage';

export class OrderOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
}
