import { authService } from '@/services';
import { ActionFunctionArgs, redirect } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
	return await authService.logout(request);
}

export async function loader() {
	return redirect('/login');
}
