export const HERO_IMAGES = {
  desktop: {
    src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743273819/hero_oqglpz.png",
    width: 1440,
    height: 663,
  },
  mobile: {
    src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743282458/hero-mobile_pjl4my.svg",
    width: 390,
    height: 448,
  },
} as const;

export const HERO_IMAGE_ALT = "Fashion collection";

export const HERO_STATS = [
  { endValue: 200, label: "International Brands" },
  { endValue: 2000, label: "High-Quality Products" },
  { endValue: 30000, label: "Happy Customers" },
] as const;
