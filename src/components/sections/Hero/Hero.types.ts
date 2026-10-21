import type { StatContent } from "@/lib/content/content.types";

export interface HeroImageProps {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface HeroStatsProps {
  stats: StatContent[];
}
