import { ArrowLeftStartOnRectangleIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { AdminTopBarProps } from "../AdminShell.types";
import { AdminMenuButton } from "./AdminMenuButton";
import { AdminProfile } from "./AdminProfile";
import { AdminSearch } from "./AdminSearch";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/TopBar: menu button for small screens, product search, "Visit store" pill, the signed-in user and the sign out button.
 *
 * @param props Component props.
 * @param props.userName Name of the signed-in user.
 * @param props.onSignOut Called when the sign out button is pressed.
 * @param props.onSearch Called with the text typed in the search box.
 * @param props.onMenuOpen Called when the menu button is pressed.
 * @returns The top bar.
 */
export const AdminTopBar = ({ userName, onSignOut, onSearch, onMenuOpen }: AdminTopBarProps) => (
  <header className={styles.shell__top}>
    <AdminMenuButton onOpen={onMenuOpen} />
    <AdminSearch onSearch={onSearch} />
    <Link href="/" className={styles.shell__store} aria-label="Visit store">
      <BuildingStorefrontIcon /> <span className={styles.shell__storeText}>Visit store</span>
    </Link>
    <AdminProfile userName={userName} />
    <button type="button" className={styles.shell__signout} aria-label="Sign out" onClick={onSignOut}>
      <ArrowLeftStartOnRectangleIcon />
    </button>
  </header>
);
