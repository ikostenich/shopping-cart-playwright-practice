import { Locator } from '@playwright/test';
import AbstractProductElement from '../abstract/AbstractProductElement';

export default class ProductElement extends AbstractProductElement {
	private readonly productAddToCardBtn: Locator;

	constructor(productLocator: Locator) {
		super(productLocator);
		this.productName = this.productLocator.locator(
			'.Product__Title-sc-124al1g-4'
		);
		this.productImage = this.productLocator.locator(
			'.Product__Image-sc-124al1g-1'
		);
		this.productPrice = this.productLocator.locator(
			'.Product__Val-sc-124al1g-6'
		);
		this.productAddToCardBtn = this.productLocator.locator(
			'.Product__BuyButton-sc-124al1g-0'
		);
	}

	async addToCart(): Promise<void> {
		await this.productAddToCardBtn.click();
	}
}
