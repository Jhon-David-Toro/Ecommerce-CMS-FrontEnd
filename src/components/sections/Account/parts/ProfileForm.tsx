"use client";

import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";

import { PROFILE_SAVED } from "../Account.constants";
import type { AccountSettingsProps } from "../Account.types";
import { validateProfile } from "../Account.utils";
import { useAccountForm } from "../hooks/useAccountForm";
import { AccountNotice } from "./AccountNotice";

/**
 * Account/ProfileForm: name and email of the customer.
 *
 * @param props Component props.
 * @param props.user Signed-in customer, used as the starting values.
 * @returns The form.
 */
export const ProfileForm = ({ user }: AccountSettingsProps) => {
  const { saveProfile } = useAuth();
  const form = useAccountForm({
    initial: { name: user.name, email: user.email },
    validate: validateProfile,
    submit: async (values) => void (await saveProfile(values)),
    success: PROFILE_SAVED,
  });

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-label="Your details">
      <FieldGroup legend="Your details">
        <AccountNotice notice={form.notice} />
        <Input label="Full name" autoComplete="name" error={form.errors.name} {...form.field("name")} />
        <Input label="Email" type="email" autoComplete="email" error={form.errors.email} {...form.field("email")} />
        <Button type="primary" size="small" text="Save details" typeAttribute="submit" />
      </FieldGroup>
    </form>
  );
};
