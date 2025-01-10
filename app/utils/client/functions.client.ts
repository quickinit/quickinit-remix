import { functions, Functions } from '@/utils';

export class ClientFunctions {
	constructor(private readonly functions: Functions) {}
	/**
	 * Copies the specified text to the clipboard.
	 * @param text - The text to copy.
	 */
	copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
	}

	/**
	 * Opens a URL in a new browser tab.
	 * @param url - The URL to open.
	 */
	openLinkInNewTab(url: string) {
		window.open(url, '_blank');
	}
}
export const clientFunctions = new ClientFunctions(functions);
