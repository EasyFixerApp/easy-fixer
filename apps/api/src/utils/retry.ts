import { logger } from "#lib";
import { wait } from "#utils";

type RetryFunction = <T>(options: RetryOptions<T>) => Promise<T>;

interface RetryOptions<T> {
  backoffFactor?: number;
  delayMs?: number;
  fn: () => Promise<T>;
  jitter?: boolean;
  label: string;
  retries?: number;
}

/**
 * @description
 * Retry a function with exponential backoff and optional jitter.
 *
 * @param options - The options for the retry function.
 * @param options.fn - The function to retry. It should return a Promise.
 * @param options.retries - The number of retries to attempt. Default is 3.
 * @param options.delayMs - The initial delay in milliseconds before the first retry. Default is 1000ms.
 * @param options.backoffFactor - The factor by which to increase the delay on each retry. Default is 1.
 * @param options.jitter - Whether to add random jitter to the delay. Default is false.
 * @param options.label - A label for logging purposes.
 * @returns A Promise that resolves with the result of the function or rejects with an error after all retries have failed.
 */
export const retry: RetryFunction = async (options) => {
  const {
    backoffFactor = 1,
    delayMs = 1000,
    fn,
    jitter = false,
    label,
    retries = 3,
  } = options;

  let lastError: Error | null = null;
  const totalAttempts = retries + 1;

  for (let attempt = 1; attempt <= totalAttempts; attempt++) {
    try {
      const result = await fn();
      logger.info(
        `Succeeded on attempt ${attempt}/${totalAttempts} for ${label}`,
      );
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      lastError = error;

      logger.warn(
        `Attempt ${attempt}/${totalAttempts} failed for ${label}:`,
        error,
      );

      if (attempt < totalAttempts) {
        const nJitter = jitter ? Math.random() * 100 : 0;
        const delay = delayMs * Math.pow(backoffFactor, attempt - 1) + nJitter;

        logger.info(`Retrying in ${delay.toFixed(0)}ms...`);
        await wait(delay);
      }
    }
  }

  logger.error(`All ${totalAttempts} attempts failed for ${label}`);
  throw lastError ?? new Error(`All retries failed for ${label}`);
};
