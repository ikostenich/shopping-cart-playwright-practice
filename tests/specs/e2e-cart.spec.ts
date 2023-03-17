import test, { expect } from '../fixtures/pageFixtures';

test.describe.parallel('Cart test', () => {
	test.beforeEach(async ({ homePage }) => {
		await homePage.visit();
	});

	test('Products are displayed in Cart', async ({ homePage, cart }) => {
		const randomProduct = await homePage.addRandomProductToCart();
		const randomProductPrice = await randomProduct.getPrice();
		expect(await homePage.getCartProductsCount()).toBe(1);

		await homePage.clickCartIcon();
		expect(await cart.getCartIconProductsCount()).toBe(1);
		expect(await (await cart.getProduct(0)).isVisible()).toBeTruthy();
		expect(await cart.getSubtotal()).toBe(randomProductPrice);
	});
	test('Products removal from Cart', async ({ homePage, cart }) => {
		await homePage.addRandomProductToCart();
		await homePage.clickCartIcon();
		expect(await cart.getProductsCount()).toBe(1);
		await (await cart.getProduct(0)).removeFromCart();
		expect(await cart.getProductsCount()).toBe(0);
		expect(await cart.getCartIconProductsCount()).toBe(0);
	});
	test('Products quantity increase/decrease', async ({ homePage, cart }) => {
		await homePage.addRandomProductToCart();
		await homePage.clickCartIcon();
		const product = await cart.getProduct(0);
		await product.increaseQuantity();
		expect(await cart.getSubtotal()).toBe((await product.getPrice()) * 2);
		await product.decreaseQuantity();
		expect(await cart.getSubtotal()).toBe(await product.getPrice());
	});
});
