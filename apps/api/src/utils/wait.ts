type Wait = (ms: number) => Promise<void>;

/**
 * @description
 * Wait for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A Promise that resolves after the specified time.
 */
export const wait: Wait = (ms) => new Promise((res) => setTimeout(res, ms));
