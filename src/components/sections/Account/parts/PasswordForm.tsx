"use client";

import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/useAuth";

import { PASSWORD_SAVED } from "../Account.constants";
import { validatePassword } from "../Account.utils";
import { useAccountForm } from "../hooks/useAccountForm";
import { AccountNotice } from "./AccountNotice";
import { PasswordFields } from "./PasswordFields";

/**
 * Account/PasswordForm: current and new password of the customer.
 *
 * @returns The form.
 */
export const PasswordForm = () => {
  const { savePassword } = useAuth();
  const form = useAccountForm({
    initial: { current: "", next: "", confirm: "" },
    validate: validatePassword,
    submit: (values) => savePassword({ current: values.current, next: values.next }),
    success: PASSWORD_SAVED,
    resetOnSuccess: true,
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-label="Change password">
      <FieldGroup legend="Change password">
        <AccountNotice notice={form.notice} />
        <PasswordFields field={form.field} errors={form.errors} />
        <Button type="primary" size="small" text="Change password" typeAttribute="submit" />
      </FieldGroup>
    </form>
  );
};
