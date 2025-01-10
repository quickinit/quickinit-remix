import { FileExtension } from '@/types';
import { fileUtils, FileUtils } from '../files';

/**
 * Utility class for client-side file operations
 */
class FileUtilsClient {
	constructor(private fileUtils: FileUtils) {}
	/**
	 * Saves file to client
	 * @param content - File content
	 * @param name - File name without extension
	 * @param extension - File extension
	 */
	saveFile(content: string, name: string, extension: FileExtension): void {
		const blob = new Blob([content], { type: this.fileUtils.getContentType(extension) });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${name}.${extension}`;
		link.click();
		window.URL.revokeObjectURL(url);
		if (link.parentNode) {
			link.parentNode.removeChild(link);
		}
	}

	/**
	 * Reads file from client
	 * @param file - File object from input
	 * @returns Promise resolving with file content as data URL
	 */
	readFile(file: File): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result as string);
			};
			reader.onerror = () => {
				reject(reader.error);
			};
			reader.readAsDataURL(file);
		});
	}

	/**
	 * Exports data as JSON file
	 * @param data - Data to export
	 * @param name - File name without extension
	 */
	exportAsJSON(data: any, name: string): void {
		const json = JSON.stringify(data, null, 2);
		this.saveFile(json, name, 'json');
	}

	/**
	 * Converts JSON to CSV format
	 * @param json - JSON data to convert
	 * @returns CSV formatted string
	 */
	jsonToCsv(json: any[]): string {
		const replacer = (_: any, value: any) => (value === null ? '' : value);
		const header = Object.keys(json[0]);
		const csv = json.map((row: any) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','));
		csv.unshift(header.join(','));
		return csv.join('\r\n');
	}

	/**
	 * Exports data as CSV file
	 * @param data - Data to export
	 * @param name - File name without extension
	 */
	exportAsCSV(data: any[], name: string): void {
		const csv = this.jsonToCsv(data);
		this.saveFile(csv, name, 'csv');
	}
}

// Export a singleton instance of FileUtilsClient
export const fileUtilsClient = new FileUtilsClient(fileUtils);
