import { createCookieSessionStorage } from '@remix-run/node';
import { createThemeSessionResolver } from 'remix-themes';
import { appUrl } from '../config';

const isProduction = process.env.NODE_ENV === 'production';

export const authSessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_auth',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET || 'default-secret'],
		secure: isProduction,
		maxAge: 60 * 60 * 24 * 30, // 30 days
		...(isProduction ? { domain: new URL(appUrl).hostname } : {}),
	},
});

const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'theme',
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secrets: ['s3cr3t'],
		// Set domain and secure only if in production
		...(isProduction ? { domain: new URL(appUrl).hostname, secure: true } : {}),
	},
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
