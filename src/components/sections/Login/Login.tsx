"use client";

import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { AuthLayout } from "@/components/patterns/AuthLayout";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth/useAuth";
import { useAuthForm } from "@/lib/auth/useAuthForm";

import { INITIAL_LOGIN, LOGIN_BULLETS, LOGIN_FALLBACK_ERROR } from "./Login.constants";
import { validateLogin } from "./Login.utils";

/**
 * Login: email and password form that signs the user in and returns them to where they came from.
 *
 * @returns The sign in page content.
 */
export const Login = () => {
  const { signIn } = useAuth();
  const form = useAuthForm({ initial: INITIAL_LOGIN, validate: validateLogin, authenticate: signIn, fallbackError: LOGIN_FALLBACK_ERROR });

  return (
    <AuthLayout
      headline="Clothes that fit your style."
      bullets={LOGIN_BULLETS}
      title="Welcome back"
      subtitle="Sign in to see your orders and check out faster."
      form={form}
      submitLabel="Sign in"
      pendingLabel="Signing in..."
      footer={
        <>
          New here? <Link href="/register">Create an account</Link>
        </>
      }
    >
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
        placeholder="Your password"
        autoComplete="current-password"
        error={form.errors.password}
        {...form.field("password")}
      />
    </AuthLayout>
  );
};
