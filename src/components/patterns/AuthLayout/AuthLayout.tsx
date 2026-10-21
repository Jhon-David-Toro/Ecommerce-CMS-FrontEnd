import type { FC } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import type { AuthLayoutProps } from "./AuthLayout.types";
import { AuthBrandPanel } from "./parts/AuthBrandPanel";
import styles from "./AuthLayout.module.scss";

/**
 * AuthLayout: full-screen sign in or sign up page with a brand panel, a title, the fields of the form and a link to the other page.
 *
 * @param props Component props.
 * @param props.title Headline of the page.
 * @param props.subtitle Sentence under the headline.
 * @param props.form Failure, submitting flag and submit handler of the form.
 * @param props.submitLabel Text of the submit button.
 * @param props.pendingLabel Text of the submit button while the form is sending.
 * @param props.footer Link to the other auth page.
 * @param props.children Fields of the form.
 * @returns The page content.
 */
export const AuthLayout: FC<AuthLayoutProps> = ({ title, subtitle, form, submitLabel, pendingLabel, footer, children }) => (
  <div className={styles.screen}>
    <AuthBrandPanel />
    <section className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      <p className={styles.auth__subtitle}>{subtitle}</p>
      <form className={styles.auth__form} onSubmit={form.handleSubmit} noValidate>
        {form.failure && <Alert>{form.failure}</Alert>}
        {children}
        <Button
          type="primary"
          size="large"
          text={form.isSubmitting ? pendingLabel : submitLabel}
          typeAttribute="submit"
          disabled={form.isSubmitting}
        />
      </form>
      <p className={styles.auth__switch}>{footer}</p>
    </section>
  </div>
);
