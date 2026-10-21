import { ArrowLeftStartOnRectangleIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { AdminTopBarProps } from "../AdminShell.types";
import { AdminProfile } from "./AdminProfile";
import { AdminSearch } from "./AdminSearch";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/TopBar: product search, "Visit store" pill, the signed-in user (links to the account page) and the sign out button.
 *
 * @param props Component props.
 * @param props.userName Name of the signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @param props.onSearch Called with the text typed in the search box.
 * @returns The top bar.
 */
export const AdminTopBar = ({ userName, onSignOut, onSearch }: AdminTopBarProps) => (
  <header className={styles.shell__top}>
    <AdminSearch onSearch={onSearch} />
    <Link href="/" className={styles.shell__store}>
      <BuildingStorefrontIcon /> Visit store
    </Link>
    <AdminProfile userName={userName} />
    <button type="button" className={styles.shell__signout} aria-label="Sign out" onClick={onSignOut}>
      <ArrowLeftStartOnRectangleIcon />
    </button>
  </header>
);
