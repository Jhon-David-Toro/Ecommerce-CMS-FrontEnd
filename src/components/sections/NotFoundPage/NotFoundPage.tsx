import { Button } from "@/components/ui/Button";

import styles from "./NotFoundPage.module.scss";

/**
 * NotFoundPage: big 404, a short explanation and two ways back into the store.
 *
 * @returns The not found content.
 */
export const NotFoundPage = () => (
  <section className={styles.notFound}>
    <p className={styles.notFound__code} aria-hidden="true">
      404
    </p>
    <h1 className={styles.notFound__title}>Page not found</h1>
    <p className={styles.notFound__text}>The page you are looking for does not exist or was moved.</p>
    <div className={styles.notFound__actions}>
      <Button type="primary" size="medium" text="Back to the store" href="/" typeAttribute="button" />
      <Button type="secondary" size="medium" text="Browse products" href="/products" typeAttribute="button" />
    </div>
  </section>
);
