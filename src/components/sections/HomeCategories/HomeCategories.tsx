import { HomeCategory } from "@/components/patterns/HomeCategory";
import styles from './HomeCategories.module.scss';

export const HomeCategories = () => {
  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>BROWSE BY DESS STYLE</h2>
      <HomeCategory />
    </section>
  )
}
