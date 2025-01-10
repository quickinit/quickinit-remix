import { createHash, randomBytes, timingSafeEqual } from 'crypto';

class CryptoUtils {
	/**
	 * Hash a password
	 * @param password - The password to hash
	 * @returns The hashed password
	 */
	hashPassword(password: string): string {
		const salt = randomBytes(16).toString('hex');
		const hash = createHash('sha256')
			.update(salt + password)
			.digest('hex');
		return `${salt}:${hash}`;
	}

	/**
	 * Compare a password
	 * @param password - The password to compare
	 * @param hashedPassword - The hashed password to compare against
	 * @returns True if the password is correct, false otherwise
	 */
	comparePassword(password: string, hashedPassword: string): boolean {
		const [salt, hash] = hashedPassword.split(':');
		const hashToCompare = createHash('sha256')
			.update(salt + password)
			.digest('hex');
		return timingSafeEqual(Buffer.from(hash), Buffer.from(hashToCompare));
	}
}

export const cryptoUtils = new CryptoUtils();
