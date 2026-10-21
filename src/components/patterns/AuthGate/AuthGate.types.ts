import type { ReactNode } from "react";

import type { PublicUser, Role } from "@/lib/auth/auth.types";

export interface AuthGateProps {
  role?: Role;
  children: ReactNode;
}

export type GateStatus = "checking" | "denied" | "allowed";

export interface GateFallbackProps {
  status: Exclude<GateStatus, "allowed">;
}

export interface GateStatusInput {
  isReady: boolean;
  user: PublicUser | null;
  role?: Role;
}

export interface LoginRedirectInput {
  isReady: boolean;
  user: PublicUser | null;
  router: { replace: (href: string) => void };
  pathname: string;
}
