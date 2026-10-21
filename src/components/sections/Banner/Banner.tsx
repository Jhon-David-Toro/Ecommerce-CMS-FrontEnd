"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import { useSiteContent } from "@/lib/content/useSiteContent";

import styles from "./Banner.module.scss";

/**
 * Banner: promotion strip with a link, editable from the admin panel, hidden when switched off and closable by the shopper.
 *
 * @returns The promotion banner, or nothing when disabled or closed.
 */
export const Banner = () => {
  const { banner } = useSiteContent();
  const [isClosed, setIsClosed] = useState(false);

  if (!banner.enabled || isClosed) return null;

  return (
    <header className={styles.banner}>
      <p className={styles.banner__paragraph}>
        {banner.text}{" "}
        <Link href={banner.linkHref} className={styles.signup}>
          {banner.linkText}
        </Link>
      </p>
      <button type="button" className={styles.banner__close} aria-label="Close banner" onClick={() => setIsClosed(true)}>
        <XMarkIcon />
      </button>
    </header>
  );
};
