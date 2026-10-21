import { HomeCategory } from "@/components/patterns/HomeCategory";

import styles from "./HomeCategories.module.scss";

/**
 * HomeCategories: "browse by dress style" section of the home page.
 *
 * @returns The categories section.
 */
export const HomeCategories = () => (
  <section className={styles.categories}>
    <h2 className={styles.categories__title}>BROWSE BY DRESS STYLE</h2>
    <HomeCategory />
  </section>
);
