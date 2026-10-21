"use client";

import { FC, useState } from "react";

import { AdditionalImages } from "@/components/patterns/AdditionalImages";
import { MainImage } from "@/components/patterns/MainImage";
import { IMAGE_CONFIG } from "@/lib/catalog/imageConfig.constants";
import { useWindowWidth } from "@/lib/shared/dom/useWindowWidth";

import { ProductImagesProps } from "./ProductImages.types";
import styles from "./ProductImages.module.scss";

/**
 * Product gallery: zoomable main image with its thumbnails.
 *
 * @param props Component props.
 * @param props.mainImage Image shown first.
 * @param props.additionalImages Extra images of the product.
 * @returns The gallery.
 */
export const ProductImages: FC<ProductImagesProps> = ({ mainImage, additionalImages }) => {
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);
  const isMobile = useWindowWidth() <= IMAGE_CONFIG.IS_MOBILE;

  return (
    <section className={styles.product__images} aria-label="Product images">
      <MainImage currentMainImage={currentMainImage} isMobile={isMobile} />
      <AdditionalImages
        currentMainImage={currentMainImage}
        mainImage={mainImage}
        setCurrentMainImage={setCurrentMainImage}
        additionalImages={additionalImages}
      />
    </section>
  );
};
