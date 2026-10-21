import type { FC } from "react";

import type { ProductDescriptionProps } from "./ProductDescription.types";
import { buildSections } from "./ProductDescription.utils";
import { DescriptionSection } from "./parts/DescriptionSection";
import styles from "./ProductDescription.module.scss";

/**
 * ProductDescription: overview, features, origin, company and care instructions of a product.
 *
 * @param props Component props.
 * @param props.description Description of the product.
 * @returns The description.
 */
export const ProductDescription: FC<ProductDescriptionProps> = ({ description }) => (
  <div className={styles.details}>
    <h2 className={styles.details__title}>Product Description</h2>
    {buildSections(description).map((section) => (
      <DescriptionSection key={section.title} section={section} />
    ))}
  </div>
);
