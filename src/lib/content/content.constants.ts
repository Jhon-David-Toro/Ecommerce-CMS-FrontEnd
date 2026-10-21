import menu from "@/assets/menu.json";
import { FOOTER_COLUMNS } from "@/lib/site/footer.constants";

import type { SiteContent, StaticPageInput } from "./content.types";

export const CONTENT_STORAGE_KEY = "content";

export const PAGE_STORAGE_KEY = "pages";

export const DEFAULT_CONTENT: SiteContent = {
  banner: { enabled: true, text: "Sign up and get 20% off to your first order.", linkText: "Sign Up Now", linkHref: "/register" },
  hero: {
    title: "FIND CLOTHES THAT MATCHES YOUR STYLE",
    paragraph:
      "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
    ctaText: "Shop Now",
    ctaHref: "/products",
    desktopImage: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743273819/hero_oqglpz.png",
    mobileImage: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743282458/hero-mobile_pjl4my.svg",
  },
  stats: [
    { endValue: 200, label: "International Brands" },
    { endValue: 2000, label: "High-Quality Products" },
    { endValue: 30000, label: "Happy Customers" },
  ],
  navbar: menu.navbar,
  sidebar: menu.sidebar,
  footerTagline: "We have clothes that suits your style and which you’re proud to wear. From women to men.",
  footerColumns: FOOTER_COLUMNS,
};

export const DEFAULT_PAGES: StaticPageInput[] = [
  {
    title: "About us",
    slug: "about",
    body: "We are a small team that loves clothes that fit well and last long.\n\nEvery piece in the catalog is picked for comfort, quality and honest prices.",
    published: true,
    updatedAt: Date.UTC(2025, 0, 1),
  },
  {
    title: "Shipping and returns",
    slug: "shipping-returns",
    body: "Orders ship within two business days.\n\nYou can return any unworn item within 30 days of delivery.",
    published: true,
    updatedAt: Date.UTC(2025, 0, 1),
  },
];
