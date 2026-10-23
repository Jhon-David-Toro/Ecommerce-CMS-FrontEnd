import type { AccountSettingsProps } from "../Account.types";
import { PasswordForm } from "./PasswordForm";
import { ProfileForm } from "./ProfileForm";
import styles from "../Account.module.scss";

/**
 * Account/Settings: the forms that change the details and the password of the customer.
 *
 * @param props Component props.
 * @param props.user Signed-in customer.
 * @returns The two forms.
 */
export const AccountSettings = ({ user }: AccountSettingsProps) => (
  <div className={styles.account__settings}>
    <ProfileForm user={user} />
    <PasswordForm />
  </div>
);
