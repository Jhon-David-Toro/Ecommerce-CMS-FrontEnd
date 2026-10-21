import type { Position } from "@/lib/shared/geometry/position.types";

export interface MainImageProps {
  currentMainImage: string;
  isMobile: boolean;
}

export interface ImageSize {
  width: number;
  height: number;
}

export interface MainImageZoomProps {
  image: string;
  size: ImageSize;
  lensPosition: Position;
}
