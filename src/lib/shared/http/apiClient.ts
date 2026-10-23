import { ApiError } from "./ApiError";
import { API_URL, FALLBACK_ERROR_MESSAGE, HTTP_STATUS } from "./api.constants";
import type { ApiErrorBody, ApiRequestOptions } from "./api.types";
import { getToken } from "./token";

/**
 * Builds the headers of a request, with the token of the session when there is one.
 *
 * @returns The headers.
 */
export const buildHeaders = () => {
  const token = getToken();
  return { "Content-Type": "application/json", Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

/**
 * Turns a failed answer into an error with the message of the API.
 *
 * @param response Failed answer.
 * @returns The error.
 */
export const toApiError = async (response: Response) => {
  const body: ApiErrorBody = await response.json().catch(() => ({}));
  return new ApiError(response.status, body.code ?? "UNKNOWN", body.message ?? FALLBACK_ERROR_MESSAGE);
};

/**
 * Calls the API and returns the JSON of the answer.
 *
 * @param path Path of the endpoint, starting with a slash.
 * @param options Method and body of the request.
 * @param options.method HTTP method, GET by default.
 * @param options.body Value sent as JSON.
 * @returns The parsed answer, or undefined when the API answers without content.
 * @throws {ApiError} When the API answers with a failure status.
 */
export const apiRequest = async <T>(path: string, { method = "GET", body }: ApiRequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: buildHeaders(),
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) throw await toApiError(response);
  return response.status === HTTP_STATUS.noContent ? (undefined as T) : ((await response.json()) as T);
};
