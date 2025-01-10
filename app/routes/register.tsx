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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { authService } from '@/services';

const registerSchema = z
	.object({
		name: z.string().min(2),
		email: z.string().email(),
		password: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type RegisterSchema = z.infer<typeof registerSchema>;

export async function loader({ request }: ActionFunctionArgs) {
	const user = await authService.getAuthUser(request);
	if (user) {
		return redirect('/');
	}
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const data = registerSchema.safeParse(Object.fromEntries(formData));

	if (!data.success) {
		return {
			error: data.error.message,
		};
	}

	try {
		await authService.createUser(data.data);
		return authService.loginWithCredentials(request);
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : 'An unknown error occurred',
		};
	}
}

export default function RegisterPage() {
	const navigation = useNavigation();
	const actionData = useActionData<typeof action>();
	const isSubmitting = navigation.state === 'submitting';
	const submit = useSubmit();
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-center text-2xl font-bold'>Create an account</CardTitle>
					<CardDescription className='text-center'>Enter your details to create your account</CardDescription>
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
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder='John Doe' autoComplete='name' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
											<PasswordInput {...field} placeholder='Create a password' autoComplete='new-password' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} placeholder='Confirm your password' autoComplete='new-password' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>

						<CardFooter className='flex flex-col space-y-4'>
							<Button type='submit' className='w-full' disabled={isSubmitting}>
								{isSubmitting ? 'Creating account...' : 'Create account'}
							</Button>
							<p className='text-center text-sm text-muted-foreground'>
								Already have an account?{' '}
								<Link to='/login' className='text-primary hover:underline'>
									Sign in
								</Link>
							</p>
						</CardFooter>
					</RemixForm>
				</Form>
			</Card>
		</div>
	);
}
