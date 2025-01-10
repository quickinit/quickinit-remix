import {
	addDays,
	differenceInDays,
	format,
	formatDistanceToNow,
	isAfter,
	isToday,
	isTomorrow,
	isValid,
	isYesterday,
	parseISO,
	subDays,
} from 'date-fns';

/**
 * Utility class for date and time operations
 */
export class DateTimeUtils {
	/**
	 * Gets relative time string (e.g. "2 days ago")
	 * @param date - Date string or Date object
	 * @returns Relative time string
	 */
	getRelativeTime(date: string | Date): string {
		return formatDistanceToNow(new Date(date), { addSuffix: true });
	}

	/**
	 * Checks if date is valid
	 * @param date - Date to validate
	 * @returns True if date is valid
	 */
	isValidDate(date: any): boolean {
		return isValid(date);
	}

	/**
	 * Formats date string (e.g. "01 Jan 2023")
	 * @param dateString - Date string or Date object
	 * @returns Formatted date string
	 */
	formatDate(dateString: string | Date): string {
		const date = new Date(dateString);
		return format(date, 'dd MMM yyyy');
	}

	/**
	 * Gets time from date (e.g. "12:30 PM")
	 * @param date - Date object or string
	 * @returns Formatted time string
	 */
	getTimeFromDate(date: Date | string): string {
		return format(new Date(date), 'hh:mm a');
	}

	/**
	 * Checks if date is in the future
	 * @param date - Date to check
	 * @returns True if date is in future
	 */
	checkIfDateIsInFuture(date: Date | string): boolean {
		return isAfter(new Date(date), new Date());
	}

	/**
	 * Converts timestamp to Date object
	 * @param timestamp - Timestamp string
	 * @returns Date object or null if invalid
	 */
	sanitizeTimeStampToDate(timestamp: string): Date | null {
		const date = new Date(timestamp);
		if (this.isValidDate(date)) {
			return date;
		}
		return null;
	}

	/**
	 * Gets current timestamp
	 * @returns Current timestamp in milliseconds
	 */
	getCurrentTimestamp(): number {
		return Date.now();
	}

	/**
	 * Parses ISO string to Date object
	 * @param isoString - ISO date string
	 * @returns Parsed Date object
	 */
	parseDate(isoString: string): Date {
		return parseISO(isoString);
	}

	/**
	 * Checks if date is today
	 * @param date - Date to check
	 * @returns True if date is today
	 */
	checkIsToday(date: Date | string): boolean {
		return isToday(date);
	}

	/**
	 * Checks if date is tomorrow
	 * @param date - Date to check
	 * @returns True if date is tomorrow
	 */
	checkIsTomorrow(date: Date | string): boolean {
		return isTomorrow(date);
	}

	/**
	 * Checks if date is yesterday
	 * @param date - Date to check
	 * @returns True if date is yesterday
	 */
	checkIsYesterday(date: Date | string): boolean {
		return isYesterday(date);
	}

	/**
	 * Adds days to date
	 * @param date - Date to add days to
	 * @param days - Number of days to add
	 * @returns New Date object
	 */
	addDaysToDate(date: Date | string, days: number): Date {
		return addDays(date, days);
	}

	/**
	 * Subtracts days from date
	 * @param date - Date to subtract days from
	 * @param days - Number of days to subtract
	 * @returns New Date object
	 */
	subtractDaysFromDate(date: Date | string, days: number): Date {
		return subDays(date, days);
	}

	/**
	 * Gets difference in days between two dates
	 * @param date1 - First date
	 * @param date2 - Second date
	 * @returns Number of days difference
	 */
	getDifferenceInDays(date1: Date | string, date2: Date | string): number {
		return differenceInDays(date1, date2);
	}
}

// Export a singleton instance of DateTimeUtils
export const dateTimeUtils = new DateTimeUtils();
