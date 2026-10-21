import type { ReactNode } from "react";

import type { Role } from "@/lib/auth/auth.types";

export interface AuthGateProps {
  role?: Role;
  children: ReactNode;
}
