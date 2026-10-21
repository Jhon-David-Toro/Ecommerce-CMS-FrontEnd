"use client";

import Link from "next/link";

import { AuthLayout } from "@/components/patterns/AuthLayout";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";
import { useAuthForm } from "@/lib/auth/useAuthForm";

import { INITIAL_REGISTER, REGISTER_FALLBACK_ERROR } from "./Register.constants";
import { toRegisterInput, validateRegister } from "./Register.utils";

/**
 * Register: sign up form that creates a customer account and signs the user in.
 *
 * @returns The registration page content.
 */
export const Register = () => {
  const { signUp } = useAuth();
  const form = useAuthForm({
    initial: INITIAL_REGISTER,
    validate: validateRegister,
    authenticate: (values) => signUp(toRegisterInput(values)),
    fallbackError: REGISTER_FALLBACK_ERROR,
  });

  return (
    <AuthLayout
      title="CREATE ACCOUNT"
      form={form}
      submitLabel="Create account"
      pendingLabel="Creating account..."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <Input label="Full name" autoComplete="name" error={form.errors.name} {...form.field("name")} />
      <Input label="Email" type="email" autoComplete="email" error={form.errors.email} {...form.field("email")} />
      <Input label="Password" type="password" autoComplete="new-password" error={form.errors.password} {...form.field("password")} />
      <Input label="Confirm password" type="password" autoComplete="new-password" error={form.errors.confirm} {...form.field("confirm")} />
    </AuthLayout>
  );
};
