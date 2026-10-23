import { Breadcrumb } from "@/components/ui/Breadcrumb";

import { ACCOUNT_TRAIL } from "../Account.constants";
import styles from "../Account.module.scss";

/**
 * Account/Header: breadcrumb and title of the account page.
 *
 * @returns The header.
 */
export const AccountHeader = () => (
  <>
    <Breadcrumb items={ACCOUNT_TRAIL} />
    <h1 className={styles.account__title}>MY ACCOUNT</h1>
  </>
);
