import Link from "next/link";

import styles from "../AuthLayout.module.scss";

/**
 * AuthLayout/BrandPanel: dark side with the brand, a short promise and a link back to the store.
 *
 * @returns The panel.
 */
export const AuthBrandPanel = () => (
  <aside className={styles.brand}>
    <Link href="/" className={styles.brand__logo}>
      SHOP.CO
    </Link>
    <p className={styles.brand__text}>Clothes that fit your style and that you are proud to wear.</p>
    <Link href="/" className={styles.brand__back}>
      Back to the store
    </Link>
  </aside>
);
