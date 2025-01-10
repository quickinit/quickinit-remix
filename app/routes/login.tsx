import { Form as RemixForm, Link, useActionData, useNavigation, useSubmit, redirect } from '@remix-run/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { type ActionFunctionArgs } from '@remix-run/node';
import { authService } from '@/services';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

type LoginSchema = z.infer<typeof loginSchema>;

export async function loader({ request }: ActionFunctionArgs) {
	const user = await authService.getAuthUser(request);
	if (user) {
		return redirect('/');
	}
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	return authService.loginWithCredentials(request);
}

export default function LoginPage() {
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();
	const isSubmitting = navigation.state === 'submitting';
	const submit = useSubmit();

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-center text-2xl font-bold'>Welcome back</CardTitle>
					<CardDescription className='text-center'>
						Enter your email and password to login to your account
					</CardDescription>
				</CardHeader>

				<Form {...form}>
					<RemixForm
						method='post'
						onSubmit={form.handleSubmit((e) => {
							submit(e, {
								method: 'post',
							});
						})}
					>
						<CardContent className='space-y-4'>
							{actionData?.error && (
								<Alert variant='destructive'>
									<AlertCircle className='h-4 w-4' />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>{actionData.error}</AlertDescription>
								</Alert>
							)}

							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} type='email' placeholder='name@example.com' autoComplete='email' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} placeholder='Enter your password' autoComplete='current-password' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter className='flex flex-col space-y-4'>
							<Button type='submit' className='w-full' disabled={isSubmitting}>
								{isSubmitting ? 'Signing in...' : 'Sign in'}
							</Button>
							<p className='text-center text-sm text-muted-foreground'>
								Don&apos;t have an account?{' '}
								<Link to='/register' className='text-primary hover:underline'>
									Sign up
								</Link>
							</p>
						</CardFooter>
					</RemixForm>
				</Form>
			</Card>
		</div>
	);
}
