"use client";

import type { FC } from "react";

import { Thumbnail } from "@/components/patterns/Thumbnail";
import { IMAGE_CONFIG } from "@/lib/catalog/imageConfig.constants";

import type { AdditionalImagesProps } from "./AdditionalImages.types";
import styles from "./AdditionalImages.module.scss";

/**
 * AdditionalImages: tab list with a thumbnail of the main image and of each extra image.
 *
 * @param props Component props.
 * @param props.currentMainImage Picture currently shown as the main image.
 * @param props.mainImage Original main picture.
 * @param props.setCurrentMainImage Receives the picture the user picks.
 * @param props.additionalImages Extra pictures of the product.
 * @returns The thumbnail tabs.
 */
export const AdditionalImages: FC<AdditionalImagesProps> = ({ currentMainImage, mainImage, setCurrentMainImage, additionalImages }) => (
  <article className={styles.thumbnails} role="tablist" aria-label="Thumbnail images">
    <Thumbnail
      image={mainImage}
      isSelected={currentMainImage === mainImage}
      onSelect={() => setCurrentMainImage(mainImage)}
      alt="Thumbnail of the main image"
      ariaLabel="Select main product image"
      width={IMAGE_CONFIG.THUMBNAIL_MAIN_WIDTH}
      height={IMAGE_CONFIG.THUMBNAIL_MAIN_HEIGHT}
    />
    {additionalImages.map((image, index) => (
      <Thumbnail
        key={image}
        image={image}
        isSelected={currentMainImage === image}
        onSelect={() => setCurrentMainImage(image)}
        alt={`Miniature ${index + 1} of the product`}
        ariaLabel={`Select thumbnail ${index + 1} of the product`}
      />
    ))}
  </article>
);
