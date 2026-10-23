import type { PublicUser } from "@/lib/auth/auth.types";

export interface BlockButtonProps {
  user: PublicUser;
  onBlockedChange: (id: number, blocked: boolean) => void;
}
