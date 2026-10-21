import Link from "next/link";

import { Button } from "@/components/ui/Button";

import type { AdminTopBarProps } from "../AdminShell.types";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/TopBar: link to the store, the name of the signed-in user and the sign out button.
 *
 * @param props Component props.
 * @param props.userName Name of the signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @returns The top bar.
 */
export const AdminTopBar = ({ userName, onSignOut }: AdminTopBarProps) => (
  <header className={styles.shell__top}>
    <Link href="/" className={styles.shell__store}>
      View store
    </Link>
    <span className={styles.shell__user}>{userName}</span>
    <Button type="secondary" size="small" text="Sign out" typeAttribute="button" onClick={onSignOut} />
  </header>
);
