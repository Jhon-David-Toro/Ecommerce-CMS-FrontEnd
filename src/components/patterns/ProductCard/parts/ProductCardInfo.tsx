import { ProductPrice } from "@/components/patterns/ProductPrice";
import { Rating } from "@/components/ui/Rating";

import type { ProductCardProps } from "../ProductCard.types";
import styles from "../ProductCard.module.scss";

/**
 * ProductCard/Info: name, rating and price of the product.
 *
 * @param props Component props.
 * @param props.name Product name.
 * @param props.rating Rating between 0 and 5.
 * @param props.price Original price.
 * @param props.discountPrice Price after the discount.
 * @param props.discount Discount percentage.
 * @returns The product information.
 */
export const ProductCardInfo = ({ name, rating, price, discountPrice, discount }: Omit<ProductCardProps, "id" | "image">) => (
  <section className={styles.product__info}>
    <h3 className={styles.product__name}>{name}</h3>
    <Rating rating={rating} size="medium" />
    <ProductPrice price={price} discountPrice={discountPrice} discount={discount} />
  </section>
);
