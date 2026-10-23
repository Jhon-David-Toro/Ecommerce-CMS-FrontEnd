"use client";

import { HomeCategory } from "@/components/patterns/HomeCategory";
import { useQuery } from "@/lib/shared/async/useQuery";
import { listCategories } from "@/lib/taxonomy/taxonomy.api";

import { NO_ARGS } from "./HomeCategories.constants";
import { toHomeCategoryItems } from "./HomeCategories.utils";
import styles from "./HomeCategories.module.scss";

/**
 * HomeCategories: "browse by dress style" section of the home page, built from the visible categories of the store.
 *
 * @returns The categories section, or nothing without categories that have a picture.
 */
export const HomeCategories = () => {
  const { data } = useQuery(listCategories, NO_ARGS);
  const items = toHomeCategoryItems(data);

  if (!items.length) return null;

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>BROWSE BY DRESS STYLE</h2>
      <HomeCategory items={items} />
    </section>
  );
};
