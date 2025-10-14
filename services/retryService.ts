export async function retryAsync<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(res => setTimeout(res, delay));
    return retryAsync(fn, retries - 1, delay);
  }
}
export async function retryAsync(fn: () => Promise<any>, retries = 3, delayMs = 500) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise(res => setTimeout(res, delayMs));
      delayMs *= 2; // exponential backoff
    }
  }
  throw lastError;
}
