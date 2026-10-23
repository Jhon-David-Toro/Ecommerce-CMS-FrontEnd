"use client";

import Image from "next/image";

import { useQuery } from "@/lib/shared/async/useQuery";
import { listBrands } from "@/lib/taxonomy/taxonomy.api";

import { BRAND_IMAGE_SIZE, NO_ARGS } from "./BrandsBanner.constants";
import { getLogoBrands } from "./BrandsBanner.utils";
import styles from "./BrandsBanner.module.scss";

/**
 * BrandsBanner: strip with the logos of the visible brands of the store; it stays hidden until a brand has a logo.
 *
 * @returns The brand strip, or nothing without logos.
 */
export const BrandsBanner = () => {
  const { data } = useQuery(listBrands, NO_ARGS);
  const brands = getLogoBrands(data);

  if (!brands.length) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.banner__container}>
        {brands.map((brand) => (
          <div key={brand.id} className={styles.banner__container_brand}>
            <Image src={brand.logo} alt={brand.name} className={styles.banner__container_image} {...BRAND_IMAGE_SIZE} />
          </div>
        ))}
      </div>
    </div>
  );
};
