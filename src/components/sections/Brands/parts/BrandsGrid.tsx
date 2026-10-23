import Link from "next/link";

import { AdminThumb } from "@/components/patterns/AdminThumb";

import type { BrandsGridProps } from "../Brands.types";
import { getBrandHref } from "../Brands.utils";
import styles from "../Brands.module.scss";

/**
 * Brands/Grid: one card for each brand.
 *
 * @param props Component props.
 * @param props.brands Brands to show.
 * @returns The grid.
 */
export const BrandsGrid = ({ brands }: BrandsGridProps) => (
  <ul className={styles.brands__grid}>
    {brands.map((brand) => (
      <li key={brand.id}>
        <Link href={getBrandHref(brand)} className={styles.brands__card}>
          <AdminThumb src={brand.logo} name={brand.name} />
          {brand.name}
        </Link>
      </li>
    ))}
  </ul>
);
