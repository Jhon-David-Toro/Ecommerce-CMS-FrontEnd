"use client";

import Image from "next/image";

import { Skeleton } from "@/components/ui/Skeleton";
import { useImageLoaded } from "@/lib/shared/dom/useImageLoaded";

import { HERO_IMAGE_ALT } from "../Hero.constants";
import type { HeroImageProps } from "../Hero.types";

/**
 * Hero/Image: hero picture that shows a skeleton until it loads.
 *
 * @param props Component props.
 * @param props.src Picture address.
 * @param props.width Picture width in pixels.
 * @param props.height Picture height in pixels.
 * @param props.className Class name of the picture.
 * @returns The skeleton and the picture.
 */
export const HeroImage = ({ src, width, height, className }: HeroImageProps) => {
  const { isLoaded, onLoad } = useImageLoaded();

  return (
    <>
      {!isLoaded && <Skeleton />}
      <Image className={className} src={src} alt={HERO_IMAGE_ALT} width={width} height={height} priority onLoad={onLoad} />
    </>
  );
};
