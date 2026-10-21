"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getPostLoginHref } from "@/lib/auth/auth.utils";
import { useAuth } from "@/lib/auth/useAuth";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { INITIAL_LOGIN } from "./Login.constants";
import { validateLogin } from "./Login.utils";
import styles from "./Login.module.scss";

/**
 * Login: email and password form that signs the user in and returns them to where they came from.
 *
 * @returns The sign in page content.
 */
export const Login = () => {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { signIn } = useAuth();
  const { values, errors, setErrors, field } = useFormValues(INITIAL_LOGIN);
  const [failure, setFailure] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates the form and signs in.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setIsSubmitting(true);
    try {
      router.replace(getPostLoginHref(await signIn(values), next));
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Could not sign in.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.auth}>
      <h1 className={styles.auth__title}>SIGN IN</h1>
      <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
        {failure && <Alert>{failure}</Alert>}
        <Input label="Email" type="email" autoComplete="email" error={errors.email} {...field("email")} />
        <Input label="Password" type="password" autoComplete="current-password" error={errors.password} {...field("password")} />
        <Button
          type="primary"
          size="large"
          text={isSubmitting ? "Signing in..." : "Sign in"}
          typeAttribute="submit"
          disabled={isSubmitting}
        />
      </form>
      <p className={styles.auth__switch}>
        New here? <Link href="/register">Create an account</Link>
      </p>
    </section>
  );
};
