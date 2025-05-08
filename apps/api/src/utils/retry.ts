import wait from "./wait.js";

//function type
type RetryFunction = <T>(options: RetryOptions<T>) => Promise<T>;

//options type
interface RetryOptions<T> {
  backoffFactor?: number;
  delayMs?: number;
  fn: () => Promise<T>;
  label: string;
  retries?: number;
}

const retry: RetryFunction = async (options) => {
  const { backoffFactor = 2, delayMs = 1000, fn, label, retries = 3 } = options;

  let lastError: Error | null = null;
  const sRetries = String(retries + 1);

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    const sAttempt = String(attempt);
    try {
      const result = await fn();
      console.log(`Succeeded on attempt ${sAttempt}/${sRetries} for ${label}`);

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      lastError = error;

      console.warn(
        `Attempt ${sAttempt}/${sRetries} failed for ${label}:`,
        error,
      );

      if (attempt <= retries) {
        const jitter = Math.random() * 100;
        const delay = delayMs * Math.pow(backoffFactor, attempt - 1) + jitter;

        console.log(`Retrying in ${String(delay)}ms...`);
        await wait(delay);
      }
    }
  }

  console.error(`All ${sRetries} attempts failed for ${label}`);
  throw lastError ?? new Error(`All retries failed for ${label}`);
};

export default retry;
