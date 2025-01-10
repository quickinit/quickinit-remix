/**
 * Utility class for string manipulation operations
 */
export class StringUtils {
	/**
	 * Converts string to camelCase format
	 * @param string - The string to convert
	 * @returns The camelCase formatted string
	 */
	toCamelCase(string: string): string {
		return string.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
	}

	/**
	 * Converts string to kebab-case format
	 * @param string - The string to convert
	 * @returns The kebab-case formatted string
	 */
	toKebabCase(string: string): string {
		return string
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	/**
	 * Converts string to snake_case format
	 * @param string - The string to convert
	 * @returns The snake_case formatted string
	 */
	toSnakeCase(string: string): string {
		return string
			.replace(/([a-z])([A-Z])/g, '$1_$2')
			.replace(/[\s-]+/g, '_')
			.toLowerCase();
	}

	/**
	 * Removes special characters from string
	 * @param string - The string to clean
	 * @returns The string with special characters removed
	 */
	removeSpecialChars(string: string): string {
		return string.replace(/[^a-zA-Z0-9 ]/g, '');
	}

	/**
	 * Checks if string is empty or contains only whitespace
	 * @param string - The string to check
	 * @returns True if string is empty or whitespace only
	 */
	isEmpty(string: string): boolean {
		return !string || string.trim().length === 0;
	}

	/**
	 * Truncates string to specified length with optional suffix
	 * @param string - The string to truncate
	 * @param length - Maximum length of the string
	 * @param suffix - Optional suffix to append (default: '...')
	 * @returns The truncated string
	 */
	truncate(string: string, length: number, suffix = '...'): string {
		if (!string || string.length <= length) return string;
		return string.slice(0, length).trim() + suffix;
	}

	/**
	 * Counts occurrences of a substring in a string
	 * @param string - The string to search in
	 * @param searchString - The substring to search for
	 * @returns Number of occurrences
	 */
	countOccurrences(string: string, searchString: string): number {
		return string.split(searchString).length - 1;
	}

	/**
	 * Creates URL-friendly slug from text
	 * @param text - The text to convert
	 * @returns The slugified string
	 */
	slugify(text: string): string {
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-')
			.replace(/^-+/, '')
			.replace(/-+$/, '');
	}

	/**
	 * Extracts only numbers from string
	 * @param string - The string to process
	 * @returns String containing only numbers
	 */
	extractNumbers(string: string): string {
		return string.replace(/[^0-9]/g, '');
	}

	/**
	 * Checks if string contains only alphabetic characters
	 * @param string - The string to check
	 * @returns True if string contains only letters
	 */
	isAlphabetic(string: string): boolean {
		return /^[A-Za-z]+$/.test(string);
	}

	/**
	 * Checks if string contains only numeric characters
	 * @param string - The string to check
	 * @returns True if string contains only numbers
	 */
	isNumeric(string: string): boolean {
		return /^[0-9]+$/.test(string);
	}

	/**
	 * Converts enum string to readable text
	 * @param text - The enum string to convert
	 * @returns The formatted readable text
	 */
	enumToText(text: string): string {
		return text
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	/**
	 * Capitalizes first letter of string
	 * @param text - The string to capitalize
	 * @returns The capitalized string
	 */
	capitalizeFirstLetter(text: string): string {
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	}

	/**
	 * Capitalizes first letter of each word in string
	 * @param text - The string to capitalize
	 * @returns The capitalized string
	 */
	capitalizeEachWord(text: string): string {
		return text.split(' ').map(this.capitalizeFirstLetter).join(' ');
	}
}

export const stringUtils = new StringUtils();
