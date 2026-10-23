export const CATEGORY_STORAGE_KEY = "categories";

export const BRAND_STORAGE_KEY = "brands";

export const CATEGORY_SEEDS = [
  {
    name: "T-Shirts",
    slug: "t-shirts",
    description: "Everyday tees and graphic prints.",
    image: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743734058/image_11_cy2xsh.svg",
  },
  {
    name: "Shorts",
    slug: "shorts",
    description: "Light shorts for warm days.",
    image: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743735880/image_13_dyuo7e.svg",
  },
  {
    name: "Hoodie",
    slug: "hoodie",
    description: "Warm hoodies and sweatshirts.",
    image: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743735912/image_12_bmka5g.svg",
  },
  {
    name: "Jeans",
    slug: "jeans",
    description: "Denim in every fit.",
    image: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743734058/image_11_cy2xsh.svg",
  },
] as const;

export const BRAND_SEEDS = [
  { name: "Versace", slug: "versace", logo: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280453/versacce_xucuwa.svg" },
  { name: "Zara", slug: "zara", logo: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280453/zara_t2sniu.svg" },
  { name: "Gucci", slug: "gucci", logo: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/gucci_fmosjl.svg" },
  { name: "Calvin Klein", slug: "calvin-klein", logo: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/calvin_ghh0te.svg" },
  { name: "Prada", slug: "prada", logo: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743280454/prada_haqr5t.svg" },
] as const;

export const DRESS_STYLE_OPTIONS = ["Casual", "Formal", "Party", "Gym"] as const;
