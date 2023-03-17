import { Locator } from '@playwright/test';
import AbstractProductElement from '../abstract/AbstractProductElement';

export default class ProductCartElement extends AbstractProductElement {
	private readonly removeIcon: Locator;
	private readonly increaseQuantityBtn: Locator;
	private readonly decreaseQuantityBtn: Locator;

	constructor(productLocator: Locator) {
		super(productLocator);
		this.productName = this.productLocator.locator(
			'.CartProduct__Title-sc-11uohgb-2'
		);
		this.productImage = this.productLocator.locator(
			'.CartProduct__Image-sc-11uohgb-7'
		);
		this.productPrice = this.productLocator.locator(
			'.CartProduct__Price-sc-11uohgb-4 > p'
		);
		this.removeIcon = this.productLocator.locator(
			'.CartProduct__DeleteButton-sc-11uohgb-5'
		);
		this.increaseQuantityBtn = this.productLocator.getByRole('button', {
			name: '+'
		});
		this.decreaseQuantityBtn = this.productLocator.getByRole('button', {
			name: '-'
		});
	}

	async removeFromCart(): Promise<void> {
		await this.removeIcon.click();
	}

	async increaseQuantity(): Promise<void> {
		await this.increaseQuantityBtn.click();
	}

	async decreaseQuantity(): Promise<void> {
		await this.decreaseQuantityBtn.click();
	}
}
