import type { FC } from "react";

import type { ProductPriceProps } from "./ProductPrice.types";
import { formatPrice } from "./ProductPrice.utils";
import styles from "./ProductPrice.module.scss";

/**
 * ProductPrice: current price, with the original price crossed out and the discount when there is one.
 *
 * @param props Component props.
 * @param props.price Original price.
 * @param props.discountPrice Price after the discount.
 * @param props.discount Discount percentage.
 * @param props.currency ISO currency code.
 * @returns The price line.
 */
export const ProductPrice: FC<ProductPriceProps> = ({ price, discountPrice, discount, currency }) => (
  <p className={styles.price}>
    {discountPrice ? (
      <>
        {formatPrice(discountPrice, currency)} <span className={styles.price__discount}>{formatPrice(price, currency)}</span>
      </>
    ) : (
      formatPrice(price, currency)
    )}
    {discount && <span className={styles.discount}>-{discount}%</span>}
  </p>
);
