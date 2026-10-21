"use client";

import Image from "next/image";
import type { FC } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import { useImageZoom } from "./hooks/useImageZoom";
import type { MainImageProps } from "./MainImage.types";
import { getImageSize } from "./MainImage.utils";
import { MainImageZoom } from "./parts/MainImageZoom";
import styles from "./MainImage.module.scss";

/**
 * MainImage: product picture with a zoom lens that follows the pointer.
 *
 * @param props Component props.
 * @param props.currentMainImage Picture address.
 * @param props.isMobile True on small screens, where the zoom follows touches instead of the mouse.
 * @returns The zoomable picture.
 */
export const MainImage: FC<MainImageProps> = ({ currentMainImage, isMobile }) => {
  const { isLoaded, onLoad } = useImageLoaded();
  const { imageRef, isZooming, lensPosition, ...handlers } = useImageZoom(isMobile);
  const size = getImageSize(isMobile);

  return (
    <article className={styles.main} ref={imageRef} role="region" aria-label="Main product image with zoom" {...handlers}>
      {!isLoaded && <Skeleton />}
      <Image src={currentMainImage} alt="Main product image" {...size} className={styles.main__image} onLoad={onLoad} priority />
      {isZooming && <MainImageZoom image={currentMainImage} size={size} lensPosition={lensPosition} />}
    </article>
  );
};
