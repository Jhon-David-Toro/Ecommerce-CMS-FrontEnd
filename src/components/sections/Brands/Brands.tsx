"use client";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Spinner } from "@/components/ui/Spinner";
import { useQuery } from "@/lib/shared/async/useQuery";
import { listBrands } from "@/lib/taxonomy/taxonomy.api";

import { BRANDS_TRAIL, NO_ARGS } from "./Brands.constants";
import { getVisibleBrands } from "./Brands.utils";
import { BrandsGrid } from "./parts/BrandsGrid";
import styles from "./Brands.module.scss";

/**
 * Brands: every visible brand of the store; each one opens the products of that brand.
 *
 * @returns The brands page content.
 */
export const Brands = () => {
  const { data, isLoading } = useQuery(listBrands, NO_ARGS);

  if (isLoading) return <Spinner label="Loading brands" />;

  return (
    <section className={styles.brands}>
      <Breadcrumb items={BRANDS_TRAIL} />
      <h1 className={styles.brands__title}>BRANDS</h1>
      <BrandsGrid brands={getVisibleBrands(data)} />
    </section>
  );
};
