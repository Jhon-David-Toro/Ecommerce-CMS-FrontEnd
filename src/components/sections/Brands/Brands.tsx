"use client";

import Link from "next/link";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Spinner } from "@/components/ui/Spinner";
import { useQuery } from "@/lib/shared/async/useQuery";
import { listBrands } from "@/lib/taxonomy/taxonomy.api";

import { BRANDS_TRAIL, NO_ARGS } from "./Brands.constants";
import { getBrandHref, getVisibleBrands } from "./Brands.utils";
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
      <ul className={styles.brands__grid}>
        {getVisibleBrands(data).map((brand) => (
          <li key={brand.id}>
            <Link href={getBrandHref(brand)} className={styles.brands__card}>
              {brand.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
