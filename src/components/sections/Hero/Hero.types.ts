import type { HeroContent, StatContent } from "@/lib/content/content.types";

export interface HeroImageProps {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface HeroImagesProps {
  desktopImage: string;
  mobileImage: string;
}

export interface HeroCopyProps {
  hero: HeroContent;
  stats: StatContent[];
}

export interface HeroStatsProps {
  stats: StatContent[];
}
