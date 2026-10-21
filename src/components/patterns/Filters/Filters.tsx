import ResetFilterButton from '@/components/patterns/ResetFilterButton/ResetFilterButton';
import CategoryFilter from '@/components/patterns/CategoryFilter/CategoryFilter';
import ColorFilter from '@/components/patterns/ColorFilter/ColorFilter';
import DressStyleFilter from '@/components/patterns/DressStyleFilter/DressStyleFilter';
import PriceFilter from '@/components/patterns/PriceFilter/PriceFilter';
import SizeFilter from '@/components/patterns/SizeFilter/SizeFilter';
import styles from './Filters.module.scss';

const Filters = () => {
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

export default Filters;