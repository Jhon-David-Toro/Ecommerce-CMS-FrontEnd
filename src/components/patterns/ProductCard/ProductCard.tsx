"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { cx } from "@/lib/shared/classnames/cx";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import { PRODUCT_IMAGE_SIZE } from "./ProductCard.constants";
import type { ProductCardProps } from "./ProductCard.types";
import { getProductHref } from "./ProductCard.utils";
import { ProductCardInfo } from "./parts/ProductCardInfo";
import styles from "./ProductCard.module.scss";

/**
 * Card/Product: product picture, name, rating and price linking to the product page.
 *
 * @param props Component props.
 * @param props.id Product id, used to build the link.
 * @param props.image Picture address.
 * @param props.rest Remaining product data, forwarded to the info block.
 * @returns The product card.
 */
export const ProductCard: FC<ProductCardProps> = ({ id, image, ...rest }) => {
  const { isLoaded, onLoad } = useImageLoaded();

  return (
    <article className={styles.product}>
      {!isLoaded && <Skeleton />}
      <Link href={getProductHref(id)} className={cx(styles.product__link, !isLoaded && styles.product__loading)}>
        <div className={styles.product__media}>
          <Image src={image} alt={rest.name} {...PRODUCT_IMAGE_SIZE} className={styles.product__image} onLoad={onLoad} />
        </div>
        <ProductCardInfo {...rest} />
      </Link>
    </article>
  );
};
