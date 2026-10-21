import { useEffect, useState } from "react";

import { ABORT_ERROR_NAME } from "./http.constants";

/**
 * Ignores the error raised when a request is aborted on purpose and rethrows any other.
 *
 * @param error Reason the request failed.
 */
export const ignoreAbort = (error: unknown) => {
  if (!(error instanceof DOMException && error.name === ABORT_ERROR_NAME)) throw error;
};

/**
 * Loads a JSON document and hands it to a callback.
 *
 * @param url Address of the JSON document.
 * @param onData Receives the parsed document.
 * @returns A function that aborts the request.
 */
export const loadJson = <T>(url: string, onData: (data: T) => void) => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal })
    .then((response) => response.json() as Promise<T>)
    .then(onData)
    .catch(ignoreAbort);
  return () => controller.abort();
};

/**
 * Fetches a JSON document once per url.
 *
 * @param url Address of the JSON document.
 * @returns The parsed document, or null until it arrives.
 */
export const useFetchJson = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => loadJson<T>(url, setData), [url]);

  return data;
};
