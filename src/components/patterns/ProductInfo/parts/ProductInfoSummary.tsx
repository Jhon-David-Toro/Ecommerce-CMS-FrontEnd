import { ProductPrice } from "@/components/patterns/ProductPrice";
import { Rating } from "@/components/ui/Rating";

import type { ProductInfoSummaryProps } from "../ProductInfo.types";
import styles from "../ProductInfo.module.scss";

/**
 * ProductInfo/Summary: name, rating, price and overview of the product.
 *
 * @param props Component props.
 * @param props.product Product to describe.
 * @returns The summary.
 */
export const ProductInfoSummary = ({ product }: ProductInfoSummaryProps) => (
  <>
    <h2 className={styles.product__title}>{product.name}</h2>
    <Rating rating={product.rating} size="extra-medium" />
    <ProductPrice price={product.price} discountPrice={product.discountPrice} discount={product.discount} />
    <p className={styles.product__description}>{product.description.overview}</p>
  </>
);
