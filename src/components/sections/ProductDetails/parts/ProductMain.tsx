import { ProductImages } from "@/components/patterns/ProductImages";
import { ProductInfo } from "@/components/patterns/ProductInfo";

import type { ProductMainProps } from "../ProductDetails.types";
import styles from "../ProductDetails.module.scss";

/**
 * ProductDetails/Main: the picture gallery next to the purchase info.
 *
 * @param props Component props.
 * @param props.product Product to show.
 * @returns The main block.
 */
export const ProductMain = ({ product }: ProductMainProps) => (
  <main className={styles.container__main}>
    <ProductImages mainImage={product.image} additionalImages={product.images} />
    <ProductInfo product={product} />
  </main>
);
