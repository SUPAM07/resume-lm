/**
 * Sanitizes unknown string values in nested data structures.
 * Replaces '<UNKNOWN>' placeholder strings with empty strings.
 */
export function sanitizeUnknownStrings<T>(data: T): T {
  if (typeof data === 'string') {
    return (data === '<UNKNOWN>' ? '' : data) as T;
  }
  if (Array.isArray(data)) {
    return data.map((item) => sanitizeUnknownStrings(item)) as T;
  }
  if (typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeUnknownStrings(value)])
    ) as T;
  }
  return data;
}

/**
 * Generates a time-appropriate greeting message.
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Formats a date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
