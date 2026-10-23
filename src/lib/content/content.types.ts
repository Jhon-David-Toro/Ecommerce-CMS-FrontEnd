import type { FooterColumn } from "@/lib/site/footer.types";
import type { MenuItem } from "@/lib/site/menuItem.types";

export interface BannerContent {
  enabled: boolean;
  text: string;
  linkText: string;
  linkHref: string;
}

export interface HeroContent {
  title: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;
  desktopImage: string;
  mobileImage: string;
}

export interface StatContent {
  endValue: number;
  label: string;
}

export interface SiteContent {
  banner: BannerContent;
  hero: HeroContent;
  stats: StatContent[];
  navbar: MenuItem[];
  sidebar: MenuItem[];
  footerTagline: string;
  footerColumns: FooterColumn[];
}

export interface StaticPage {
  id: number;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  updatedAt: number;
}

export type StaticPageInput = Omit<StaticPage, "id">;
