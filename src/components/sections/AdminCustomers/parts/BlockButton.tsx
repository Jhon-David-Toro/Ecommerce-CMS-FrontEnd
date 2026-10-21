import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

import { ActionButton } from "@/components/ui/ActionButton";
import { ROLES } from "@/lib/auth/auth.constants";

import type { BlockButtonProps } from "../AdminCustomers.types";

/**
 * Customers/BlockButton: blocks or unblocks a customer; administrators cannot be blocked.
 *
 * @param props Component props.
 * @param props.user User of the row.
 * @param props.onBlockedChange Called with the user id and the new blocked state.
 * @returns The button, or null for administrators.
 */
export const BlockButton = ({ user, onBlockedChange }: BlockButtonProps) => {
  const label = user.blocked ? "Unblock" : "Block";

  if (user.role === ROLES.admin) return null;

  return (
    <ActionButton
      label={label}
      icon={user.blocked ? LockOpenIcon : LockClosedIcon}
      tone={user.blocked ? "neutral" : "danger"}
      aria-label={`${label} ${user.name}`}
      onClick={() => onBlockedChange(user.id, !user.blocked)}
    />
  );
};
