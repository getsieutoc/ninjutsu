export { preload } from 'swr';

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);

  return response.json();
}

export const configs = {
  fetcher,
  suspend: true,
};
