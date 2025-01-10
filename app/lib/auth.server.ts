import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { User } from '@prisma/client';
import { authService } from '@/services';

export const authenticator = new Authenticator<User>();

const formStrategy = new FormStrategy(async ({ form }) => {
	const email = form.get('email') as string;
	const password = form.get('password') as string;
	const user = await authService.verifyLogin({ email, password });
	if (!user) {
		throw new Error('Invalid credentials');
	}
	return user;
});

authenticator.use(formStrategy, 'form');
