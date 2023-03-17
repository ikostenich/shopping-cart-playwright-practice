import { Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../config/constants';
import ProductElement from './ProductElement';
import { getRandomNumber } from '../../utils/dataHelpers';

export default class HomePage {
	private readonly page: Page;
	private readonly products: Locator;
	private readonly cartIcon: Locator;
	private readonly cartProductsCounter: Locator;

	constructor(page: Page) {
		this.page = page;
		this.products = page.locator('.Product__Container-sc-124al1g-2');
		this.cartIcon = page.locator('.Cart__CartIcon-sc-1h98xa9-2');
		this.cartProductsCounter = page.locator(
			'.Cart__CartQuantity-sc-1h98xa9-3'
		);
	}

	public async visit(): Promise<void> {
		await this.page.goto(`${BASE_URL}/`);
	}

	public async getProductsCount(): Promise<number> {
		return this.products.count();
	}

	public async clickCartIcon(): Promise<void> {
		await this.cartIcon.click();
	}

	public async getCartProductsCount(): Promise<number> {
		const textContent = await this.cartProductsCounter.textContent();
		if (!textContent) {
			throw new Error('Cart products count text content is null');
		}
		return parseInt(textContent);
	}

	public async getProduct(index: number): Promise<ProductElement> {
		const productLocator = this.products.nth(index);
		return new ProductElement(productLocator);
	}

	public async addRandomProductToCart(): Promise<ProductElement> {
		const randomProductId = getRandomNumber(
			0,
			await this.getProductsCount()
		);
		const randomProduct = await this.getProduct(randomProductId);
		await randomProduct.addToCart();
		return randomProduct;
	}
}
