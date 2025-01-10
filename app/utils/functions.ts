/**
 * Utility class containing various helper functions.
 */
export class Functions {
	/**
	 * Rounds off a number to the specified decimal places.
	 * @param number - The number to round off.
	 * @param decimalPlaces - The number of decimal places.
	 */
	roundOff(number: number, decimalPlaces: number) {
		return Math.round(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;
	}

	/**
	 * Generates a random number between the specified min and max values.
	 * @param min - The minimum value.
	 * @param max - The maximum value.
	 */
	getRandomNumber(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Pauses execution for the specified number of seconds.
	 * @param seconds - The number of seconds to sleep.
	 */
	sleep(seconds: number) {
		return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
	}

	/**
	 * Returns a random item from an array.
	 * @param array - The array to pick a random item from.
	 */
	getRandomItemFromArray<T>(array: T[]) {
		return array[this.getRandomNumber(0, array.length - 1)];
	}

	/**
	 * Returns the maximum of two numbers.
	 * @param a - The first number.
	 * @param b - The second number.
	 */
	max(a: number, b: number) {
		return a > b ? a : b;
	}

	/**
	 * Returns the minimum of two numbers.
	 * @param a - The first number.
	 * @param b - The second number.
	 */
	min(a: number, b: number) {
		return a < b ? a : b;
	}

	/**
	 * Debounces a function by the specified delay.
	 * @param func - The function to debounce.
	 * @param delay - The delay in milliseconds.
	 */
	debounce(func: any, delay: number) {
		let timeout: NodeJS.Timeout;
		return (e: any) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(e);
			}, delay);
		};
	}

	/**
	 * Generates a random ID.
	 */
	randomId() {
		return Math.floor(Math.random() * 1000000000);
	}

	/**
	 * Generates a random color in hexadecimal format.
	 */
	getRandomColor() {
		return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	}

	/**
	 * Omits specified keys from an object.
	 * @param obj - The object to omit keys from.
	 * @param keys - The keys to omit.
	 */
	omitKeys<T extends Record<string, any>>(obj: T, keys: (keyof T)[]) {
		const newObj = { ...obj };
		keys.forEach((key) => {
			delete newObj[key];
		});
		return newObj;
	}

	/**
	 * Picks specified keys from an object.
	 * @param obj - The object to pick keys from.
	 * @param keys - The keys to pick.
	 */
	pickKeys<T extends Record<string, any>>(obj: T, keys: (keyof T)[]) {
		const newObj = {} as T;
		keys.forEach((key) => {
			newObj[key] = obj[key];
		});
		return newObj;
	}
}

// Export an instance of the Functions class
export const functions = new Functions();
