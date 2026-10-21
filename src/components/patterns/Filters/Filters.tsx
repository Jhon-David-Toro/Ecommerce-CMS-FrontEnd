import { ResetFilterButton } from "@/components/patterns/ResetFilterButton";
import { CategoryFilter } from "@/components/patterns/CategoryFilter";
import { ColorFilter } from "@/components/patterns/ColorFilter";
import { DressStyleFilter } from "@/components/patterns/DressStyleFilter";
import { PriceFilter } from "@/components/patterns/PriceFilter";
import { SizeFilter } from "@/components/patterns/SizeFilter";
import styles from './Filters.module.scss';

export const Filters = () => {
  return (
    <section className={styles.filters}>
      <h2>Filters</h2>
      <CategoryFilter />
      <PriceFilter />
      <ColorFilter />
      <SizeFilter />
      <DressStyleFilter />
      <ResetFilterButton />
    </section>
  );
};
