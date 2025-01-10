import { FileContentType, FileExtension } from '@/types';

export class FileUtils {
	private fileExtensions = new Map<FileExtension, FileContentType>([
		['txt', 'text/plain'],
		['md', 'text/markdown'],
		['json', 'application/json'],
		['csv', 'text/csv'],
		['png', 'image/png'],
		['jpg', 'image/jpeg'],
		['jpeg', 'image/jpeg'],
		['webp', 'image/webp'],
		['gif', 'image/gif'],
		['svg', 'image/svg+xml'],
		['pdf', 'application/pdf'],
		['doc', 'application/msword'],
		['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
		['xls', 'application/vnd.ms-excel'],
		['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
		['ppt', 'application/vnd.ms-powerpoint'],
		['pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
		['mp3', 'audio/mpeg'],
		['mp4', 'video/mp4'],
		['mov', 'video/quicktime'],
		['avi', 'video/x-msvideo'],
		['mkv', 'video/x-matroska'],
		['zip', 'application/zip'],
		['rar', 'application/vnd.rar'],
		['tar', 'application/x-tar'],
		['gz', 'application/gzip'],
	]);

	/**
	 * Gets content type from file extension
	 * @param extension - File extension
	 * @returns Content type string
	 */
	getContentType(extension: FileExtension): string {
		return this.fileExtensions.get(extension) || 'text/plain';
	}

	/**
	 * Gets file extension from content type
	 * @param contentType - Content type string
	 * @returns File extension or 'txt' if not found
	 */
	getExtension(contentType: FileContentType): FileExtension {
		return Array.from(this.fileExtensions.entries()).find(([, value]) => value === contentType)?.[0] || 'txt';
	}
}

export const fileUtils = new FileUtils();
