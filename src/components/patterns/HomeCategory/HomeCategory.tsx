import categories from "@/assets/home-category.json";

import { HomeCategoryCard } from "./parts/HomeCategoryCard";
import styles from "./HomeCategory.module.scss";

/**
 * HomeCategory: grid of dress-style categories.
 *
 * @returns The category grid.
 */
export const HomeCategory = () => (
  <section className={styles.category}>
    {categories.map((category) => (
      <HomeCategoryCard key={category.title} category={category} />
    ))}
  </section>
);
