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

import { INITIAL_REGISTER } from "./Register.constants";
import { validateRegister } from "./Register.utils";
import styles from "./Register.module.scss";

/**
 * Register: sign up form that creates a customer account and signs the user in.
 *
 * @returns The registration page content.
 */
export const Register = () => {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { signUp } = useAuth();
  const { values, errors, setErrors, field } = useFormValues(INITIAL_REGISTER);
  const [failure, setFailure] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates the form and creates the account.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateRegister(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setIsSubmitting(true);
    try {
      const user = await signUp({ name: values.name, email: values.email, password: values.password });
      router.replace(getPostLoginHref(user, next));
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Could not create the account.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.auth}>
      <h1 className={styles.auth__title}>CREATE ACCOUNT</h1>
      <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
        {failure && <Alert>{failure}</Alert>}
        <Input label="Full name" autoComplete="name" error={errors.name} {...field("name")} />
        <Input label="Email" type="email" autoComplete="email" error={errors.email} {...field("email")} />
        <Input label="Password" type="password" autoComplete="new-password" error={errors.password} {...field("password")} />
        <Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirm} {...field("confirm")} />
        <Button
          type="primary"
          size="large"
          text={isSubmitting ? "Creating account..." : "Create account"}
          typeAttribute="submit"
          disabled={isSubmitting}
        />
      </form>
      <p className={styles.auth__switch}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </section>
  );
};
