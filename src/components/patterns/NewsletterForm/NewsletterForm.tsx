"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useNewsletterForm } from "./hooks/useNewsletterForm";
import styles from "./NewsletterForm.module.scss";

/**
 * NewsletterForm: email field that adds the shopper to the newsletter list and confirms it.
 *
 * @returns The form.
 */
export const NewsletterForm = () => {
  const form = useNewsletterForm();

  return (
    <form className={styles.newsletter} onSubmit={form.handleSubmit} noValidate aria-label="Newsletter">
      <p className={styles.newsletter__title}>STAY UP TO DATE ABOUT OUR LATEST OFFERS</p>
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        error={form.errors.email}
        hint={form.message}
        {...form.field("email")}
      />
      <Button type="primary" size="small" text="Subscribe" typeAttribute="submit" />
    </form>
  );
};
