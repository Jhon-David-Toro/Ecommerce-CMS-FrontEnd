import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import type { AdminProfileProps } from "../AdminShell.types";
import { getInitial } from "../AdminShell.utils";
import styles from "../AdminShell.module.scss";

/**
 * AdminShell/Profile: avatar and name of the signed-in user, linked to the account page.
 *
 * @param props Component props.
 * @param props.userName Name of the signed-in user.
 * @returns The link.
 */
export const AdminProfile = ({ userName }: AdminProfileProps) => (
  <Link href="/admin/account" className={styles.shell__profile}>
    <span className={styles.shell__avatar} aria-hidden="true">
      {getInitial(userName)}
    </span>
    <span className={styles.shell__user}>{userName}</span>
    <ChevronDownIcon className={styles.shell__chevron} />
  </Link>
);
