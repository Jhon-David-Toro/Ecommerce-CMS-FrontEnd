import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import type { AuthFormProps } from "../AuthLayout.types";
import styles from "../AuthLayout.module.scss";

/**
 * AuthLayout/Form: the failure message, the fields and the submit button of the form.
 *
 * @param props Component props.
 * @param props.form Failure, submitting flag and submit handler of the form.
 * @param props.submitLabel Text of the submit button.
 * @param props.pendingLabel Text of the submit button while the form is sending.
 * @param props.children Fields of the form.
 * @returns The form.
 */
export const AuthForm = ({ form, submitLabel, pendingLabel, children }: AuthFormProps) => (
  <form className={styles.auth__form} onSubmit={form.handleSubmit} noValidate>
    {form.failure && <Alert>{form.failure}</Alert>}
    {children}
    <Button
      type="primary"
      size="large"
      text={form.isSubmitting ? pendingLabel : submitLabel}
      typeAttribute="submit"
      disabled={form.isSubmitting}
    />
  </form>
);
