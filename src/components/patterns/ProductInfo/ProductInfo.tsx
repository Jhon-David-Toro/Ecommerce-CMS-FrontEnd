"use client";

import type { FC } from "react";

import { useProductOptions } from "./hooks/useProductOptions";
import { ProductInfoOptions } from "./parts/ProductInfoOptions";
import { ProductInfoPurchase } from "./parts/ProductInfoPurchase";
import { ProductInfoSummary } from "./parts/ProductInfoSummary";
import type { ProductInfoProps } from "./ProductInfo.types";
import styles from "./ProductInfo.module.scss";

/**
 * ProductInfo: summary, color and size options and purchase controls of a product.
 *
 * @param props Component props.
 * @param props.product Product to show.
 * @returns The product information.
 */
export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const { selectedColor, selectedSize, quantity, added, add, setColor, setSize, setQuantity } = useProductOptions(product);

  return (
    <article className={styles.product}>
      <ProductInfoSummary product={product} />
      <ProductInfoOptions
        product={product}
        selectedColor={selectedColor}
        onColorChange={setColor}
        selectedSize={selectedSize}
        onSizeChange={setSize}
      />
      <ProductInfoPurchase quantity={quantity} stock={product.stock} added={added} onQuantityChange={setQuantity} onAdd={add} />
    </article>
  );
};
