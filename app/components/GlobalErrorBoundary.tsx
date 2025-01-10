import { isRouteErrorResponse, useRouteError, Links, Meta, Scripts } from '@remix-run/react';
import { AlertTriangle, Home, RefreshCw, FileQuestion, Ban, Shield, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import '@/tailwind.css';

interface ErrorDetails {
	title: string;
	description: string;
	icon: React.ReactNode;
}

const getErrorDetails = (status: number): ErrorDetails => {
	switch (status) {
		case 404:
			return {
				title: 'Page Not Found',
				description: "The page you are looking for doesn't exist or has been moved.",
				icon: <FileQuestion className='text-warning h-16 w-16' />,
			};
		case 401:
			return {
				title: 'Unauthorized',
				description: 'You need to be authenticated to access this page.',
				icon: <Shield className='text-warning h-16 w-16' />,
			};
		case 403:
			return {
				title: 'Forbidden',
				description: "You don't have permission to access this page.",
				icon: <Ban className='h-16 w-16 text-destructive' />,
			};
		case 500:
			return {
				title: 'Server Error',
				description: 'Something went wrong on our servers.',
				icon: <ServerCrash className='h-16 w-16 text-destructive' />,
			};
		default:
			return {
				title: 'Error Occurred',
				description: 'Something unexpected happened.',
				icon: <AlertTriangle className='h-16 w-16 text-destructive' />,
			};
	}
};

export function ErrorBoundary() {
	const error = useRouteError();

	let errorMessage = 'An unknown error occurred';
	let status = 500;

	if (isRouteErrorResponse(error)) {
		status = error.status;
		errorMessage = error.data?.message || error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	}

	const errorDetails = getErrorDetails(status);

	return (
		<html lang='en' className='light'>
			<head>
				<title>{errorDetails.title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body className='bg-gradient-to-br from-background to-muted'>
				<div className='flex min-h-screen items-center justify-center p-4 sm:p-8 md:p-12'>
					<Card className='w-full max-w-3xl overflow-hidden shadow-lg'>
						<div className='relative'>
							<div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10' />
							<CardHeader className='relative z-10 text-center'>
								<div className='mx-auto mb-6'>{errorDetails.icon}</div>
								<CardTitle className='mb-2 text-4xl font-bold tracking-tight'>{errorDetails.title}</CardTitle>
								<CardDescription className='text-xl'>{errorDetails.description}</CardDescription>
							</CardHeader>
						</div>
						<CardContent className='space-y-8 p-6 sm:p-8'>
							<Separator className='my-4' />
							<ScrollArea className='h-[200px] rounded-md border bg-muted/30 p-4'>
								<div className='space-y-2'>
									<h3 className='font-semibold'>Error Details:</h3>
									<p className='break-words text-sm text-muted-foreground'>{errorMessage}</p>
									{status && (
										<p className='text-sm'>
											<span className='font-semibold'>Status Code:</span> {status}
										</p>
									)}
								</div>
							</ScrollArea>
							<div className='flex flex-col justify-center gap-4 pt-4 sm:flex-row'>
								<Button
									variant='outline'
									size='lg'
									className='w-full sm:w-auto'
									onClick={() => window.location.reload()}
								>
									<RefreshCw className='mr-2 h-5 w-5' />
									Try Again
								</Button>
								<Button size='lg' className='w-full sm:w-auto' asChild>
									<a href='/'>
										<Home className='mr-2 h-5 w-5' />
										Back to Home
									</a>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
				<Scripts />
			</body>
		</html>
	);
}
