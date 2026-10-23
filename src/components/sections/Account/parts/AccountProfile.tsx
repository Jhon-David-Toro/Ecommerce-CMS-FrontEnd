import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROLES } from "@/lib/auth/auth.constants";

import type { AccountProfileProps } from "../Account.types";
import styles from "../Account.module.scss";

/**
 * Account/Profile: initial, name, email and role of the customer, with the sign out button on the right.
 *
 * @param props Component props.
 * @param props.user Signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @returns The profile card.
 */
export const AccountProfile = ({ user, onSignOut }: AccountProfileProps) => (
  <div className={styles.account__profile}>
    <span className={styles.account__avatar} aria-hidden="true">
      {user.name.charAt(0).toUpperCase()}
    </span>
    <div className={styles.account__identity}>
      <p className={styles.account__name}>{user.name}</p>
      <p className={styles.account__email}>{user.email}</p>
    </div>
    <Badge tone="info">{user.role === ROLES.admin ? "Administrator" : "Customer"}</Badge>
    <div className={styles.account__signout}>
      <Button type="secondary" size="small" text="Sign out" typeAttribute="button" onClick={onSignOut} />
    </div>
  </div>
);
