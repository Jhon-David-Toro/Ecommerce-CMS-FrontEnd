"use client";

import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";

import { PASSWORD_SAVED } from "../Account.constants";
import { validatePassword } from "../Account.utils";
import { useAccountForm } from "../hooks/useAccountForm";

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
        {form.notice.message && <Alert tone={form.notice.failed ? "error" : "success"}>{form.notice.message}</Alert>}
        <Input
          label="Current password"
          type="password"
          autoComplete="current-password"
          error={form.errors.current}
          {...form.field("current")}
        />
        <Input label="New password" type="password" autoComplete="new-password" error={form.errors.next} {...form.field("next")} />
        <Input
          label="Repeat new password"
          type="password"
          autoComplete="new-password"
          error={form.errors.confirm}
          {...form.field("confirm")}
        />
        <Button type="primary" size="small" text="Change password" typeAttribute="submit" />
      </FieldGroup>
    </form>
  );
};
