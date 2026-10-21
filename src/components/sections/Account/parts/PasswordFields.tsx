import { Input } from "@/components/ui/Input";

import type { PasswordFieldsProps } from "../Account.types";

/**
 * Account/PasswordFields: the three password inputs.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.errors Errors by field.
 * @returns The inputs.
 */
export const PasswordFields = ({ field, errors }: PasswordFieldsProps) => (
  <>
    <Input label="Current password" type="password" autoComplete="current-password" error={errors.current} {...field("current")} />
    <Input label="New password" type="password" autoComplete="new-password" error={errors.next} {...field("next")} />
    <Input label="Repeat new password" type="password" autoComplete="new-password" error={errors.confirm} {...field("confirm")} />
  </>
);
