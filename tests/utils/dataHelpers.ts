/* eslint-disable @typescript-eslint/no-explicit-any */
export function getRandomNumber(min = 0, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomValue(obj: Array<any>) {
	return obj[Math.floor(Math.random() * obj.length)];
}
