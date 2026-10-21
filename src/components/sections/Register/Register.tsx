"use client";

import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { AuthLayout } from "@/components/patterns/AuthLayout";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";
import { useAuthForm } from "@/lib/auth/useAuthForm";

import { INITIAL_REGISTER, REGISTER_BULLETS, REGISTER_FALLBACK_ERROR } from "./Register.constants";
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
      headline="Join the store in a minute."
      bullets={REGISTER_BULLETS}
      title="Create your account"
      subtitle="It takes a minute and lets you track your orders."
      form={form}
      submitLabel="Create account"
      pendingLabel="Creating account..."
      footer={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
    >
      <Input
        label="Full name"
        icon={UserIcon}
        placeholder="Your full name"
        autoComplete="name"
        error={form.errors.name}
        {...form.field("name")}
      />
      <Input
        label="Email"
        type="email"
        icon={EnvelopeIcon}
        placeholder="you@example.com"
        autoComplete="email"
        error={form.errors.email}
        {...form.field("email")}
      />
      <Input
        label="Password"
        type="password"
        icon={LockClosedIcon}
        revealable
        placeholder="At least 6 characters"
        autoComplete="new-password"
        error={form.errors.password}
        {...form.field("password")}
      />
      <Input
        label="Confirm password"
        type="password"
        icon={LockClosedIcon}
        revealable
        placeholder="Repeat your password"
        autoComplete="new-password"
        error={form.errors.confirm}
        {...form.field("confirm")}
      />
    </AuthLayout>
  );
};
