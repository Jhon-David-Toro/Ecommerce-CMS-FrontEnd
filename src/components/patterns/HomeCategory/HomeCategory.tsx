import { HomeCategoryCard } from "./parts/HomeCategoryCard";
import type { HomeCategoryProps } from "./HomeCategory.types";
import styles from "./HomeCategory.module.scss";

/**
 * HomeCategory: grid of category cards.
 *
 * @param props Component props.
 * @param props.items Categories to show.
 * @returns The category grid.
 */
export const HomeCategory = ({ items }: HomeCategoryProps) => (
  <section className={styles.category}>
    {items.map((category) => (
      <HomeCategoryCard key={category.title} category={category} />
    ))}
  </section>
);
