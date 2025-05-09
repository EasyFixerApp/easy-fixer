import logger from "#lib/logger.js";

import wait from "./wait.js";

type RetryFunction = <T>(options: RetryOptions<T>) => Promise<T>;

interface RetryOptions<T> {
  backoffFactor?: number;
  delayMs?: number;
  fn: () => Promise<T>;
  jitter?: boolean;
  label: string;
  retries?: number;
}

const retry: RetryFunction = async (options) => {
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

export default retry;
