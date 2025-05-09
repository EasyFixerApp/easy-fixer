type Wait = (ms: number) => Promise<void>;

export const wait: Wait = (ms) => new Promise((res) => setTimeout(res, ms));
