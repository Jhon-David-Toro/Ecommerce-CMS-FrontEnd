'use client';

import { useState, FC } from 'react';
import Image from 'next/image';
import { IMAGE_CONFIG } from '../../constants/ImageConfig.constant';
import { MainImageProps } from '../../interfaces/main-image/MainImage.interface';
import { calculateZoomedImageTranslate } from '../../helpers/imageZoomUtils';
import { useImageZoom } from '../../hooks/useImageZoom';
import ZoomLens from '../zoom-lens/ZoomLens';
import ZoomedImage from '../zoomed-images/ZoomedImage';
import styles from './MainImage.module.scss';
import Skeleton from '@/app/components/skeleton/Skeleton';

const MainImage: FC<MainImageProps> = ({ currentMainImage, isMobile }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { imageRef, isZooming, lensPosition, ...handlers } = useImageZoom(isMobile);
  const imageWidth = isMobile ? IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH_MOBILE : IMAGE_CONFIG.ZOOMED_IMAGE_WIDTH;
  const imageHeight = isMobile ? IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT_MOBILE : IMAGE_CONFIG.ZOOMED_IMAGE_HEIGHT;
  const zoomedTranslate = calculateZoomedImageTranslate(lensPosition, imageWidth, imageHeight);

  return (
    <article
      className={styles.main}
      ref={imageRef}
      role="region"
      aria-label="Main product image with zoom"
      {...handlers}
    >
      {!imageLoaded && <Skeleton />}
      <Image
        src={currentMainImage}
        alt="Main product image"
        width={imageWidth}
        height={imageHeight}
        className={styles.main__image}
        onLoad={() => setImageLoaded(true)}
        priority
      />
      {isZooming && <ZoomLens lensPosition={lensPosition} />}
      {isZooming && (
        <ZoomedImage
          currentMainImage={currentMainImage}
          width={imageWidth}
          height={imageHeight}
          zoomFactor={IMAGE_CONFIG.ZOOM_FACTOR}
          translateX={zoomedTranslate.x}
          translateY={zoomedTranslate.y}
        />
      )}
    </article>
  );
};

export default MainImage;
