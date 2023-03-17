import { Locator, Page } from '@playwright/test';
import ProductCartElement from './ProductCartElement';

export default class CartComponent {
	private readonly page: Page;
	private readonly products: Locator;
	private readonly subtotal: Locator;
	private readonly cartProductsCounter: Locator;

	constructor(page: Page) {
		this.page = page;
		this.products = page.locator('.CartProduct__Container-sc-11uohgb-0');
		this.cartProductsCounter = page.locator(
			'.Cart__CartQuantity-sc-1h98xa9-3'
		);
		this.subtotal = page.locator('.Cart__SubPriceValue-sc-1h98xa9-9');
	}

	public async getProduct(index: number): Promise<ProductCartElement> {
		const productLocator = this.products.nth(index);
		return new ProductCartElement(productLocator);
	}

	public async getProductsCount(): Promise<number> {
		return this.products.count();
	}

	public async getCartIconProductsCount(): Promise<number> {
		const textContent = await this.cartProductsCounter.textContent();
		if (!textContent) {
			throw new Error('Cart products count text content is null');
		}
		return parseInt(textContent);
	}

	public async getSubtotal() {
		const subtotalText = await this.subtotal.textContent();
		if (!subtotalText) {
			throw new Error('Cart products count text content is null');
		}
		return parseFloat(subtotalText.replace('$', ''));
	}
}
