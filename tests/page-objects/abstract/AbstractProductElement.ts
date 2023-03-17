import { Locator } from '@playwright/test';

export default abstract class AbstractProductElement {
	protected productLocator: Locator;
	protected productName!: Locator;
	protected productImage!: Locator;
	protected productPrice!: Locator;

	constructor(productLocator: Locator) {
		this.productLocator = productLocator;
	}

	async getName(): Promise<string | null> {
		return await this.productName.textContent();
	}

	async getImage(): Promise<string | null> {
		return await this.productImage.getAttribute('src');
	}

	async getPrice(): Promise<number> {
		const priceElementText = await this.productPrice.textContent();
		if (!priceElementText) {
			throw new Error('Cart products count text content is null');
		}
		return parseFloat(priceElementText.replace('$', ''));
	}

	async isVisible(): Promise<boolean> {
		const name = await this.productName.isVisible();
		const image = await this.productImage.isVisible();
		const price = await this.productPrice.isVisible();

		return name && image && price;
	}
}
