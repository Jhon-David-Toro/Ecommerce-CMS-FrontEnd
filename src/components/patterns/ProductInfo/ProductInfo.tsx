"use client";

import { useState } from "react";
import type { FC } from "react";

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
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <article className={styles.product}>
      <ProductInfoSummary product={product} />
      <ProductInfoOptions
        product={product}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
      />
      <ProductInfoPurchase quantity={quantity} setQuantity={setQuantity} />
    </article>
  );
};
