// export const expect = fixture.expect;
import { test as baseTest } from '@playwright/test';
import CartComponent from '../page-objects/cart/CartComponent';
import HomePage from '../page-objects/home-page/HomePage';

type pages = {
	homePage: HomePage;
	cart: CartComponent;
};

const test = baseTest.extend<pages>({
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	cart: async ({ page }, use) => {
		await use(new CartComponent(page));
	}
});

export default test;
export const expect = test.expect;
