import { prisma } from '@/lib/db.server';
import { User } from '@prisma/client';
import { LoginFormData, RegisterFormData } from '@/types';
import { authSessionStorage } from '../lib/sessions.server';
import { redirect } from '@remix-run/node';
import { authenticator } from '@/lib/auth.server';
import { cryptoUtils } from '@/utils/server';
import { logger } from '@/logger';

class AuthService {
	/**
	 * Verify the login credentials
	 * @param data - The login form data
	 * @returns The user object if the login is successful, null otherwise
	 */
	async verifyLogin(data: LoginFormData): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { email: data.email } });
		if (!user) return null;

		const isValid = cryptoUtils.comparePassword(data.password, user.password);
		if (!isValid) return null;
		return user;
	}

	/**
	 * Create a new user
	 * @param data - The register form data
	 * @returns The created user object
	 * @throws Error if the email already exists
	 */
	async createUser(data: RegisterFormData): Promise<User> {
		const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
		if (existingUser) {
			throw new Error('Email already exists');
		}
		const user = await prisma.user.create({
			data: {
				email: data.email,
				password: cryptoUtils.hashPassword(data.password),
				name: data.name,
			},
		});
		logger.info(`User created: ${user.email}`);
		return user;
	}

	/**
	 * Get the authentication session
	 * @param request - The request object
	 * @returns The session object
	 */
	async getAuthSession(request: Request) {
		const session = await authSessionStorage.getSession(request.headers.get('cookie'));
		return session;
	}

	/**
	 * Get the user from the authentication session
	 * @param request - The request object
	 * @returns The user object
	 */
	async getAuthUser(request: Request) {
		const session = await this.getAuthSession(request);
		return session.get('user');
	}

	/**
	 * Logout the user and redirect to the login page
	 * @param request - The request object
	 * @example
	 * ```tsx
	 * export async function action({ request }: ActionFunctionArgs) {
	 * 	return await authService.logout(request);
	 * }
	 * ```
	 */
	async logout(request: Request) {
		const session = await this.getAuthSession(request);
		return redirect('/login', {
			headers: { 'Set-Cookie': await authSessionStorage.destroySession(session) },
		});
	}

	/**
	 * Login the user and redirect to the redirectTo URL
	 * @param request - The request object
	 * @example
	 * ```tsx
	 * export async function action({ request }: ActionFunctionArgs) {
	 * 	return authService.loginWithCredentials(request);
	 * }
	 * ```
	 */
	async loginWithCredentials(request: Request) {
		try {
			const user = await authenticator.authenticate('form', request);
			const session = await this.getAuthSession(request);
			session.set('user', user);

			const returnTo = session.get('returnTo');
			if (returnTo) {
				session.unset('returnTo');
				throw redirect(returnTo, {
					headers: { 'Set-Cookie': await authSessionStorage.commitSession(session) },
				});
			}

			return redirect('/', {
				headers: { 'Set-Cookie': await authSessionStorage.commitSession(session) },
			});
		} catch (error) {
			return {
				error: 'Invalid credentials',
			};
		}
	}
}

export const authService = new AuthService();
