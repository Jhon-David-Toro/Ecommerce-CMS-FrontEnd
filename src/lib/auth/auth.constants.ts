export const USER_STORAGE_KEY = "users";

export const SESSION_STORAGE_KEY = "session";

export const ROLES = { admin: "admin", customer: "customer" } as const;

export const AUTH_ERRORS = {
  invalidCredentials: "Incorrect email or password.",
  emailTaken: "An account with this email already exists.",
  blocked: "This account has been blocked.",
  weakPassword: "The password must have at least 6 characters.",
} as const;

export const MIN_PASSWORD_LENGTH = 6;

export const ADMIN_HOME = "/admin";

export const ACCOUNT_HOME = "/account";

// Mock-only accounts: they disappear once the Spring Boot API issues real sessions
export const SEED_USERS = [
  { name: "Store Admin", email: "admin@shop.test", password: "admin123", role: ROLES.admin },
  { name: "Sample Customer", email: "customer@shop.test", password: "customer123", role: ROLES.customer },
] as const;
