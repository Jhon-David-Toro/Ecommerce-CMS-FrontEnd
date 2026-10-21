"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { ProductPrice } from "@/components/patterns/ProductPrice";
import { Rating } from "@/components/ui/Rating";
import { Skeleton } from "@/components/ui/Skeleton";
import { cx } from "@/lib/shared/classnames/cx";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import { PRODUCT_IMAGE_SIZE } from "./ProductCard.constants";
import type { ProductCardProps } from "./ProductCard.types";
import { getProductHref } from "./ProductCard.utils";
import styles from "./ProductCard.module.scss";

/**
 * Card/Product: product picture, name, rating and price linking to the product page.
 *
 * @param props Component props.
 * @param props.id Product id, used to build the link.
 * @param props.name Product name.
 * @param props.price Original price.
 * @param props.discountPrice Price after the discount.
 * @param props.rating Rating between 0 and 5.
 * @param props.image Picture address.
 * @param props.discount Discount percentage.
 * @returns The product card.
 */
export const ProductCard: FC<ProductCardProps> = ({ id, name, price, discountPrice, rating, image, discount }) => {
  const { isLoaded, onLoad } = useImageLoaded();

  return (
    <article className={styles.product}>
      {!isLoaded && <Skeleton />}
      <Link href={getProductHref(id)} className={cx(styles.product__link, !isLoaded && styles.product__loading)}>
        <Image src={image} alt={name} {...PRODUCT_IMAGE_SIZE} className={styles.product__image} onLoad={onLoad} />
        <section className={styles.product__info}>
          <h3 className={styles.product__name}>{name}</h3>
          <Rating rating={rating} size="medium" />
          <ProductPrice price={price} discountPrice={discountPrice} discount={discount} />
        </section>
      </Link>
    </article>
  );
};
