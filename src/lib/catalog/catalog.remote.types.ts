export type ApiProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface ApiImage {
  id: number;
  imageUrl: string;
  alt: string | null;
  main: boolean;
}

export interface ApiColor {
  id: number;
  name: string;
  hex: string;
}

export interface ApiSize {
  id: number;
  name: string;
  value: string;
}

export interface ApiDetail {
  overview: string | null;
  origin: string | null;
  companyName: string | null;
  aboutCompany: string | null;
  careInstructions: string | null;
}

export interface ApiFaq {
  question: string;
  answer: string;
}

export interface ApiProductSummary {
  id: number;
  name: string;
  slug: string;
  thumbnailUrl: string | null;
  price: number;
  compareAtPrice: number | null;
  status: ApiProductStatus;
  stock: number;
  categoryName: string | null;
  brandName: string | null;
  createdAt: number;
}

export interface ApiProduct extends Omit<ApiProductSummary, "thumbnailUrl"> {
  shortDescription: string | null;
  dressStyle: string | null;
  ratingAverage: number;
  ratingCount: number;
  thumbnailUrl: string | null;
  images: ApiImage[];
  colors: ApiColor[];
  sizes: ApiSize[];
  detail: ApiDetail | null;
  features: string[];
  faqs: ApiFaq[];
}

export interface ApiPage<T> {
  content: T[];
  last: boolean;
}

export interface ApiVariantRequest {
  color: string;
  size: string;
  sku: string;
  stock: number;
}

export interface ApiProductRequest {
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: number | null;
  brandId: number | null;
  dressStyle: string;
  images: { imageUrl: string; alt: string; main: boolean }[];
  colors: { name: string; hex: string }[];
  sizes: { name: string; value: string }[];
  variants: ApiVariantRequest[];
  detail: { overview: string; origin: string; companyName: string; aboutCompany: string; careInstructions: string };
  features: string[];
  faqs: ApiFaq[];
}

export interface TaxonomyIds {
  categoryId: number | null;
  brandId: number | null;
}
