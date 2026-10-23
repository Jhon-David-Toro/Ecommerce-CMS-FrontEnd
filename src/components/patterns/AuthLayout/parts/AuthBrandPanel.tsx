import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import type { AuthBrandPanelProps } from "../AuthLayout.types";
import { BrandBullets } from "./BrandBullets";
import styles from "../AuthLayout.module.scss";

/**
 * AuthLayout/BrandPanel: dark side with the brand, a big sentence, a few benefits and a link back to the store.
 *
 * @param props Component props.
 * @param props.headline Big sentence.
 * @param props.bullets Short benefits.
 * @returns The panel.
 */
export const AuthBrandPanel = ({ headline, bullets }: AuthBrandPanelProps) => (
  <aside className={styles.brand}>
    <Link href="/" className={styles.brand__logo}>
      SHOP.CO
    </Link>
    <div className={styles.brand__message}>
      <p className={styles.brand__text}>{headline}</p>
      <BrandBullets bullets={bullets} />
    </div>
    <Link href="/" className={styles.brand__back}>
      <ArrowLeftIcon /> Back to the store
    </Link>
  </aside>
);
