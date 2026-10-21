import { ArrowLeftStartOnRectangleIcon, BuildingStorefrontIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { AdminTopBarProps } from "../AdminShell.types";
import { getInitial } from "../AdminShell.utils";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/TopBar: "Visit store" pill, the signed-in user (links to the account page) and the sign out button.
 *
 * @param props Component props.
 * @param props.userName Name of the signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @returns The top bar.
 */
export const AdminTopBar = ({ userName, onSignOut }: AdminTopBarProps) => (
  <header className={styles.shell__top}>
    <Link href="/" className={styles.shell__store}>
      <BuildingStorefrontIcon /> Visit store
    </Link>
    <Link href="/admin/account" className={styles.shell__profile}>
      <span className={styles.shell__avatar} aria-hidden="true">
        {getInitial(userName)}
      </span>
      <span className={styles.shell__user}>{userName}</span>
      <ChevronDownIcon className={styles.shell__chevron} />
    </Link>
    <button type="button" className={styles.shell__signout} aria-label="Sign out" onClick={onSignOut}>
      <ArrowLeftStartOnRectangleIcon />
    </button>
  </header>
);
