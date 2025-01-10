import { z, ZodError, ZodSchema } from 'zod';

/**
 * Utility class for validation operations using Zod
 */
export class ValidationUtils {
	/**
	 * Validates and returns a string
	 * @param input - The value to validate as a string
	 * @returns The validated string
	 * @throws ZodError if validation fails
	 */
	getString(input: any): string {
		return z.string().parse(input);
	}

	/**
	 * Validates and returns a non-empty string
	 * @param input - The value to validate as a non-empty string
	 * @returns The validated non-empty string
	 * @throws ZodError if validation fails
	 */
	getNonEmptyString(input: any): string {
		return z.string().min(1).parse(input);
	}

	/**
	 * Validates and returns a number
	 * @param input - The value to validate as a number (can be string or number)
	 * @returns The validated number
	 * @throws ZodError if validation fails
	 */
	getNumber(input: any): number {
		return z.number().or(z.string().regex(/^\d+$/).transform(Number)).parse(input);
	}

	/**
	 * Validates and returns a non-negative number
	 * @param input - The value to validate as a non-negative number (can be string or number)
	 * @returns The validated non-negative number
	 * @throws ZodError if validation fails
	 */
	getNonNegativeNumber(input: any): number {
		return z.number().min(0).or(z.string().regex(/^\d+$/).transform(Number)).parse(input);
	}

	/**
	 * Validates form data against a Zod schema
	 * @param formData - The form data to validate
	 * @param schema - The Zod schema to validate against
	 * @returns An object containing success status, validated data (if successful), or validation errors
	 */
	validateForm<T>(formData: FormData, schema: ZodSchema<T>): { success: boolean; data?: T; errors?: ZodError<T> } {
		const formEntries = Object.fromEntries(formData.entries());
		const parseResult = schema.safeParse(formEntries);

		if (parseResult.success) {
			return { success: true, data: parseResult.data };
		} else {
			return { success: false, errors: parseResult.error };
		}
	}
}

export const validationUtils = new ValidationUtils();
