"use client";

import Link from "next/link";
import { useState } from "react";

import { useSiteContent } from "@/lib/content/useSiteContent";

import { BannerClose } from "./parts/BannerClose";
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
      <BannerClose onClose={() => setIsClosed(true)} />
    </header>
  );
};
