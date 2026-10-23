import type { FooterColumn, FooterLink, PaymentMethod } from "./footer.types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "SHOP",
    links: [
      { label: "All Products", href: "/products" },
      { label: "On Sale", href: "/products?view=sale" },
      { label: "New Arrivals", href: "/products?view=new" },
      { label: "Brands", href: "/brands" },
    ],
  },
  {
    title: "ACCOUNT",
    links: [
      { label: "My Account", href: "/account" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
      { label: "Shopping Cart", href: "/cart" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Track Your Order", href: "/account" },
      { label: "Search Products", href: "/search" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
];

export const SOCIAL_LINKS: FooterLink[] = [
  { label: "Twitter", href: "https://twitter.com", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872766/1_qlgjcw.svg" },
  { label: "Facebook", href: "https://facebook.com", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872766/2_bpjcct.svg" },
  { label: "Instagram", href: "https://instagram.com", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872766/3_wcmdih.svg" },
  { label: "GitHub", href: "https://github.com", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872765/4_zeamng.svg" },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "Visa", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872617/Badge_fgvh48.svg", alt: "Visa" },
  { name: "Mastercard", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872617/Badge_1_lciyfb.svg", alt: "Mastercard" },
  { name: "Paypal", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872617/Badge_2_roemuk.svg", alt: "Paypal" },
  { name: "Apple Pay", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872617/Badge_3_rb0c45.svg", alt: "Apple Pay" },
  { name: "Google Pay", src: "https://res.cloudinary.com/dxspvj1rj/image/upload/v1743872617/Badge_4_cqnbtz.svg", alt: "Google Pay" },
];

export const PAYMENT_ICON_SIZE = { width: 66, height: 49 } as const;

export const SOCIAL_ICON_SIZE = { width: 30, height: 30 } as const;
