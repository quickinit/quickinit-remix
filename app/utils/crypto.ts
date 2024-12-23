import { createHash, randomBytes, timingSafeEqual } from 'crypto';
/**
 * Hash a password
 * @param password - The password to hash
 * @returns The hashed password
 */
export const hashPassword = (password: string): string => {
	const salt = randomBytes(16).toString('hex');
	const hash = createHash('sha256')
		.update(salt + password)
		.digest('hex');
	return `${salt}:${hash}`;
};

/**
 * Compare a password
 * @param password - The password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns True if the password is correct, false otherwise
 */
export const comparePassword = (password: string, hashedPassword: string): boolean => {
	const [salt, originalHash] = hashedPassword.split(':');

	const hash = createHash('sha256')
		.update(salt + password)
		.digest('hex');

	return timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
};
