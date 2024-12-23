import { Link } from '@remix-run/react';
import { Code, Github, Layout, Palette, Shield, CheckCircle2, Terminal, Copy } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { toast } from 'sonner';
import { ModeToggle } from '~/components/mode-toggle';

const features = [
	{
		icon: Code,
		title: 'Remix',
		description: 'Server-Side Rendering, Nested Routes, Enhanced Performance',
	},
	{
		icon: Shield,
		title: 'TypeScript',
		description: 'Robust Type Safety & Enhanced Developer Experience',
	},
	{
		icon: Palette,
		title: 'Shadcn UI',
		description: 'Beautiful, Accessible, Customizable Components',
	},
	{
		icon: Layout,
		title: 'Tailwind CSS',
		description: 'Utility-First Styling with Rapid Development',
	},
];

const technicalFeatures = [
	'Zod Form Validation',
	'React Hook Form',
	'ESLint & Prettier',
	'Jest & React Testing Library',
	'Husky Git Hooks',
	'Commitlint',
	'Absolute Imports',
	'Dark Mode Support',
	'Resource Routes',
	'Error Handling',
	'Environment Config',
	'Winston Logs',
	'Zustand State Management',
	'GitHub Workflows',
	'Middleware Setup',
];

export default function HomePage() {
	const copyInstallCommand = () => {
		navigator.clipboard.writeText('npx create-remix@latest quickinit-remix');
		toast.success('Command Copied', {
			description: 'Installation command copied to clipboard!',
		});
	};

	return (
		<div className='min-h-screen bg-background'>
			<div className='absolute right-4 top-4'>
				<ModeToggle />
			</div>

			<div className='container mx-auto px-4 py-16'>
				<div className='mb-16 text-center'>
					<Badge variant='outline' className='mb-4'>
						QuickInit Remix v1.0.0
					</Badge>
					<h1 className='mb-4 text-5xl font-bold text-foreground'>QuickInit Remix</h1>
					<p className='mx-auto max-w-2xl text-xl text-muted-foreground'>
						Enterprise-Grade Remix Starter Kit for Rapid Development
					</p>

					<div className='mt-8 flex justify-center space-x-4'>
						<Button variant='secondary' asChild size='lg'>
							<Link to='https://github.com/quickinit/quickinit-remix' target='_blank' rel='noopener noreferrer'>
								<Github className='mr-2 h-5 w-5' />
								GitHub
							</Link>
						</Button>
					</div>
				</div>
				<div className='mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{features.map((feature, index) => (
						<Card
							key={index}
							className='group border border-neutral-200 bg-white transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900'
						>
							<CardHeader>
								<feature.icon className='mb-4 h-10 w-10 text-primary transition-transform group-hover:rotate-6' />
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground'>{feature.description}</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className='rounded-xl border bg-muted/20 p-8'>
					<h2 className='mb-8 text-center text-3xl font-bold'>Comprehensive Technical Features</h2>

					<div className='grid gap-4 md:grid-cols-3'>
						{technicalFeatures.map((feature, index) => (
							<div
								key={index}
								className='flex items-center space-x-3 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900'
							>
								<CheckCircle2 className='h-5 w-5 text-green-500' />
								<span className='text-foreground'>{feature}</span>
							</div>
						))}
					</div>
				</div>

				<div className='mt-16 text-center'>
					<h2 className='mb-6 text-3xl font-bold'>Quick Start</h2>
					<div className='group relative mx-auto max-w-2xl rounded-lg bg-muted/30 p-6'>
						<pre className='flex items-center justify-between overflow-x-auto rounded-md border border-neutral-200 bg-white p-4 text-left dark:border-neutral-800 dark:bg-neutral-900'>
							<code className='flex items-center text-sm'>
								<Terminal className='mr-2 text-primary' />
								npx create-qi@latest
							</code>
							<Button
								variant='ghost'
								size='icon'
								className='opacity-0 transition-opacity group-hover:opacity-100'
								onClick={copyInstallCommand}
							>
								<Copy className='h-4 w-4' />
							</Button>
						</pre>
						<div className='mt-4 text-sm text-muted-foreground'>
							Create a new QuickInit Remix project with a single command
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
