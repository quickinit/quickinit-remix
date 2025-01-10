import * as React from 'react';
import { LogOut, LucideProps } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from '@/components/ui/sidebar';
import { Link, useSubmit } from '@remix-run/react';
import { useAuth } from '@/hooks/use-auth';
import { ModeToggle } from './ModeToggle';

type SidebarRoute = {
	name: string;
	url: string;
	isAdmin: boolean;
	icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
};

export default function AppSidebar({ children, pages }: { children: React.ReactNode; pages: SidebarRoute[] }) {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
			<SidebarComponent pages={pages}>{children}</SidebarComponent>
		</SidebarProvider>
	);
}

export function SidebarComponent({ children, pages }: { children: React.ReactNode; pages: SidebarRoute[] }) {
	const { setOpenMobile } = useSidebar();
	const { user } = useAuth();
	const submit = useSubmit();

	return (
		<>
			<Sidebar collapsible='icon'>
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<Avatar className='flex h-8 w-8 items-center justify-center rounded-sm bg-transparent p-1'>
								<AvatarImage src={user?.profilePicture ?? undefined} className='rounded-sm' />
								<AvatarFallback className='rounded-sm'>
									{user?.name
										? user?.name
												.split(' ')
												.map((word) => word[0])
												.join('')
												.slice(0, 2)
												.toUpperCase()
										: 'QI'}
								</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>{user?.name ?? 'Unknown'}</span>
								<span className='truncate text-xs'>{user?.email ?? 'Unknown'}</span>
							</div>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarMenu>
						<SidebarGroup className='gap-3'>
							{pages.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<Link to={item.url} onClick={() => setOpenMobile(false)} className='gap-3'>
											<item.icon className='!h-6' />
											<span>{item.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarGroup>
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								onClick={async () => {
									submit(null, {
										method: 'post',
										action: '/logout',
									});
								}}
							>
								<LogOut size={25} />
								<span>Logout</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarInset className='h-dvh overflow-hidden'>
				<header className='sticky top-0 flex h-12 w-full shrink-0 items-center justify-between gap-2 pr-6 transition-[width,height] ease-linear'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
					</div>
					<ModeToggle />
				</header>
				<div className='h-[calc(100dvh-48px)] w-full overflow-auto bg-background px-3 py-0'>{children}</div>
			</SidebarInset>
		</>
	);
}
