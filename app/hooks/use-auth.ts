import { User } from '@prisma/client';
import { useRouteLoaderData } from '@remix-run/react';

export function useAuth() {
	const data = useRouteLoaderData('root') as { user: User | null };
	return {
		user: data?.user ?? null,
		isAuthenticated: !!data?.user,
	};
}
