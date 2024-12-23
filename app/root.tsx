import { clsx } from 'clsx';
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes';

import { themeSessionResolver } from './sessions.server';
import { LiveReload, Outlet, Scripts, ScrollRestoration, Links, Meta, useLoaderData } from '@remix-run/react';
import { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import './tailwind.css';
import { Toaster } from './components/ui/sonner';
export { ErrorBoundary } from './components/global-error-boundary';

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme(),
	};
}
export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap',
	},
];
export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>();
	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction='/action/set-theme'>
			<App />
		</ThemeProvider>
	);
}

export function App() {
	const data = useLoaderData<typeof loader>();
	const [theme] = useTheme();
	return (
		<html lang='en' className={clsx(theme)}>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<body>
				<Outlet />
				<Toaster duration={2500} richColors closeButton position='top-right' />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
