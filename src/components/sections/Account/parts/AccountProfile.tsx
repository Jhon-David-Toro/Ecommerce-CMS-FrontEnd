import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROLES } from "@/lib/auth/auth.constants";

import type { AccountProfileProps } from "../Account.types";
import styles from "../Account.module.scss";

/**
 * Account/Profile: name, email and role of the customer with the sign out button.
 *
 * @param props Component props.
 * @param props.user Signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @returns The profile card.
 */
export const AccountProfile = ({ user, onSignOut }: AccountProfileProps) => (
  <div className={styles.account__profile}>
    <div>
      <p className={styles.account__name}>{user.name}</p>
      <p className={styles.account__email}>{user.email}</p>
    </div>
    <Badge tone="info">{user.role === ROLES.admin ? "Administrator" : "Customer"}</Badge>
    <Button type="secondary" size="small" text="Sign out" typeAttribute="button" onClick={onSignOut} />
  </div>
);
