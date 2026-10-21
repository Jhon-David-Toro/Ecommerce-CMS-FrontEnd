export type Role = "admin" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  blocked: boolean;
  createdAt: number;
}

export type PublicUser = Omit<User, "password">;

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterInput extends Credentials {
  name: string;
}

export interface AuthState {
  user: PublicUser | null;
  isReady: boolean;
  hydrate: () => Promise<void>;
  signIn: (credentials: Credentials) => Promise<PublicUser>;
  signUp: (input: RegisterInput) => Promise<PublicUser>;
  signOut: () => Promise<void>;
}

export interface AuthFormOptions<V> {
  initial: V;
  validate: (values: V) => Record<string, string>;
  authenticate: (values: V) => Promise<PublicUser>;
  fallbackError: string;
}
