import test, { expect } from '../fixtures/pageFixtures';

test.describe.parallel('Login / Logout Flow', () => {
	test('Products are displayed on Home Page', async ({ homePage }) => {
		await homePage.visit();
		expect(await homePage.getProductsCount()).toBeGreaterThan(1);
		expect(await (await homePage.getProduct(0)).isVisible()).toBeTruthy();
	});
	test('Product is added to Cart', async ({ homePage }) => {
		await homePage.visit();
		const randomProduct = await homePage.getProduct(0);
		await randomProduct.addToCart();
		expect(await homePage.getCartProductsCount()).toBe(1);
	});
});
