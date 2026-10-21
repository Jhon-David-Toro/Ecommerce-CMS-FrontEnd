import Image from "next/image";
import type { FC } from "react";

import type { ZoomedImageProps } from "./ZoomedImage.types";
import styles from "./ZoomedImage.module.scss";

/**
 * ZoomedImage: enlarged view of the main image, shifted to the part under the lens.
 *
 * @param props Component props.
 * @param props.currentMainImage Picture address.
 * @param props.width Width of the unzoomed picture in pixels.
 * @param props.height Height of the unzoomed picture in pixels.
 * @param props.zoomFactor Enlargement multiplier.
 * @param props.translateX Horizontal shift in pixels.
 * @param props.translateY Vertical shift in pixels.
 * @returns The enlarged picture.
 */
export const ZoomedImage: FC<ZoomedImageProps> = ({ currentMainImage, width, height, zoomFactor, translateX, translateY }) => (
  <article className={styles.zoomed}>
    <Image
      src={currentMainImage}
      alt="Enlarged image of the product"
      width={width * zoomFactor}
      height={height * zoomFactor}
      className={styles.zoomed__image}
      style={{ transform: `translate(-${translateX}px, -${translateY}px)` }}
    />
  </article>
);
