import Image from "next/image";

import { BRANDS, BRAND_IMAGE_SIZE } from "./BrandsBanner.constants";
import styles from "./BrandsBanner.module.scss";

/**
 * BrandsBanner: strip with the logos of the brands the store sells.
 *
 * @returns The brand strip.
 */
export const BrandsBanner = () => (
  <div className={styles.banner}>
    <div className={styles.banner__container}>
      {BRANDS.map((brand) => (
        <div key={brand.name} className={styles.banner__container_brand}>
          <Image src={brand.logo} alt={brand.name} className={styles.banner__container_image} {...BRAND_IMAGE_SIZE} />
        </div>
      ))}
    </div>
  </div>
);
