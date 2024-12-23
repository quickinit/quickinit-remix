import { prisma } from '~/lib/db.server';
import { User } from '@prisma/client';
import { LoginFormData, RegisterFormData } from '~/types/auth';
import { authSessionStorage } from './sessions.server';
import { redirect } from '@remix-run/node';
import { authenticator } from '~/lib/auth.server';
import { comparePassword, hashPassword } from '~/utils/crypto';
import logger from '~/logger';

/**
 * Verify the login credentials
 * @param data - The login form data
 * @returns The user object if the login is successful, null otherwise
 */
export async function verifyLogin(data: LoginFormData): Promise<User | null> {
	const user = await prisma.user.findUnique({ where: { email: data.email } });
	if (!user) return null;

	const isValid = comparePassword(data.password, user.password);
	if (!isValid) return null;
	return user;
}

/**
 * Create a new user
 * @param data - The register form data
 * @returns The created user object
 */
export async function createUser(data: RegisterFormData): Promise<User> {
	const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
	if (existingUser) {
		throw new Error('Email already exists');
	}
	const user = await prisma.user.create({
		data: {
			email: data.email,
			password: hashPassword(data.password),
			name: data.name,
		},
	});
	logger.info(`User created: ${user.email}`);
	return user;
}

/**
 * Authenticate the user and redirect to the login page if the user is not authenticated
 * @param request - The request object
 * @param returnTo - The URL to redirect to after authentication
 * @returns The user object
 */
export async function authenticate(request: Request, returnTo?: string) {
	const session = await getAuthSession(request);
	const user = session.get('user');
	if (user) return user;
	if (returnTo) session.set('returnTo', returnTo);
	throw redirect('/login', {
		headers: { 'Set-Cookie': await authSessionStorage.commitSession(session) },
	});
}

/**
 * Require the user to be anonymous
 * @param request - The request object
 * @param redirectTo - The URL to redirect to if the user is not anonymous
 */
export async function requireAnonymous(request: Request, redirectTo: string = '/') {
	const user = await getAuthUser(request);
	if (!user) return;
	throw redirect(redirectTo);
}

/**
 * Get the authentication session
 * @param request - The request object
 * @returns The session object
 */
export async function getAuthSession(request: Request) {
	const session = await authSessionStorage.getSession(request.headers.get('cookie'));
	return session;
}

/**
 * Get the user from the authentication session
 * @param request - The request object
 * @returns The user object
 */
export async function getAuthUser(request: Request) {
	const session = await getAuthSession(request);
	return session.get('user');
}

/**
 * Logout the user and redirect to the login page
 * @param request - The request object
 */
export async function logout(request: Request) {
	const session = await getAuthSession(request);
	return redirect('/login', {
		headers: { 'Set-Cookie': await authSessionStorage.destroySession(session) },
	});
}

/**
 * Login the user and redirect to the redirectTo URL
 * @param request - The request object
 * @param redirectTo - The URL to redirect to after login
 */
export async function loginWithCredentials(request: Request) {
	try {
		const user = await authenticator.authenticate('form', request);
		const session = await getAuthSession(request);
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
