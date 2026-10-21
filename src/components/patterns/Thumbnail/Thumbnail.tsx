"use client";

import Image from "next/image";
import type { FC } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { IMAGE_CONFIG } from "@/lib/catalog/imageConfig.constants";
import { cx } from "@/lib/shared/classnames/cx";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import type { ThumbnailProps } from "./Thumbnail.types";
import styles from "./Thumbnail.module.scss";

/**
 * Thumbnail: small picture that works as a tab to pick the main product image.
 *
 * @param props Component props.
 * @param props.image Picture address.
 * @param props.isSelected Marks the thumbnail as the selected tab.
 * @param props.onSelect Called when the thumbnail is chosen.
 * @param props.alt Alternative text of the picture.
 * @param props.ariaLabel Accessible name of the tab.
 * @param props.width Picture width in pixels.
 * @param props.height Picture height in pixels.
 * @returns The thumbnail tab.
 */
export const Thumbnail: FC<ThumbnailProps> = ({
  image,
  isSelected,
  onSelect,
  alt,
  ariaLabel,
  width = IMAGE_CONFIG.THUMBNAIL_WIDTH,
  height = IMAGE_CONFIG.THUMBNAIL_HEIGHT,
}) => {
  const { isLoaded, onLoad } = useImageLoaded();

  return (
    <button
      className={cx(styles.thumbnail, { [styles.selected]: isSelected, [styles.loading]: !isLoaded })}
      onClick={onSelect}
      role="tab"
      aria-selected={isSelected}
      aria-label={ariaLabel}
      disabled={!isLoaded}
    >
      {!isLoaded && <Skeleton />}
      <Image src={image} alt={alt} width={width} height={height} className={styles.thumbnail__image} onLoad={onLoad} />
    </button>
  );
};
