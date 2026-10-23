import Link from "next/link";
import type { FC } from "react";

import type { AuthLayoutProps } from "./AuthLayout.types";
import { AuthBrandPanel } from "./parts/AuthBrandPanel";
import { AuthForm } from "./parts/AuthForm";
import styles from "./AuthLayout.module.scss";

/**
 * AuthLayout: full-screen sign in or sign up page with a brand panel, a title, the fields of the form and a link to the other page.
 *
 * @param props Component props.
 * @param props.headline Big sentence of the brand panel.
 * @param props.bullets Short benefits listed in the brand panel.
 * @param props.title Headline of the form.
 * @param props.subtitle Sentence under the headline.
 * @param props.footer Link to the other auth page.
 * @param props.rest Form state, button texts and fields.
 * @returns The page content.
 */
export const AuthLayout: FC<AuthLayoutProps> = ({ headline, bullets, title, subtitle, footer, ...rest }) => (
  <div className={styles.screen}>
    <AuthBrandPanel headline={headline} bullets={bullets} />
    <section className={styles.auth}>
      <Link href="/" className={styles.auth__logo}>
        SHOP.CO
      </Link>
      <h1 className={styles.auth__title}>{title}</h1>
      <p className={styles.auth__subtitle}>{subtitle}</p>
      <AuthForm {...rest} />
      <p className={styles.auth__switch}>{footer}</p>
    </section>
  </div>
);
