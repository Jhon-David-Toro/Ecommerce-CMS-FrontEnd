export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

export const IS_API_ENABLED = API_URL !== "";

export const TOKEN_STORAGE_KEY = "token";

export const HTTP_STATUS = { noContent: 204, unauthorized: 401, forbidden: 403, notFound: 404 } as const;

export const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const UNSUPPORTED_MESSAGE = "This action is not available with the API yet.";
