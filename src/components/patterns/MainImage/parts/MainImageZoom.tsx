import { ZoomLens } from "@/components/patterns/ZoomLens";
import { ZoomedImage } from "@/components/patterns/ZoomedImage";
import { IMAGE_CONFIG } from "@/lib/catalog/imageConfig.constants";

import type { MainImageZoomProps } from "../MainImage.types";
import { calculateZoomedImageTranslate } from "../MainImage.utils";

/**
 * MainImage/Zoom: lens over the image and the enlarged view it points to.
 *
 * @param props Component props.
 * @param props.image Picture address.
 * @param props.size Size of the unzoomed picture.
 * @param props.lensPosition Center of the lens inside the image.
 * @returns The lens and the enlarged picture.
 */
export const MainImageZoom = ({ image, size, lensPosition }: MainImageZoomProps) => {
  const translate = calculateZoomedImageTranslate(lensPosition, size.width, size.height);

  return (
    <>
      <ZoomLens lensPosition={lensPosition} />
      <ZoomedImage
        currentMainImage={image}
        width={size.width}
        height={size.height}
        zoomFactor={IMAGE_CONFIG.ZOOM_FACTOR}
        translateX={translate.x}
        translateY={translate.y}
      />
    </>
  );
};
