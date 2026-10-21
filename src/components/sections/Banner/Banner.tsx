"use client";

import Link from "next/link";

import { useSiteContent } from "@/lib/content/useSiteContent";

import styles from "./Banner.module.scss";

/**
 * Banner: promotion strip with a link, editable from the admin panel and hidden when switched off.
 *
 * @returns The promotion banner, or nothing when disabled.
 */
export const Banner = () => {
  const { banner } = useSiteContent();

  if (!banner.enabled) return null;

  return (
    <header className={styles.banner}>
      <p className={styles.banner__paragraph}>
        {banner.text}{" "}
        <Link href={banner.linkHref} passHref className={styles.signup}>
          {banner.linkText}
        </Link>
      </p>
      <svg
        className={styles.banner__close}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        aria-label="Close icon"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </header>
  );
};
