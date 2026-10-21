import type { Color } from "@/lib/catalog/color.types";
import type { FAQ } from "@/lib/catalog/faq.types";
import type { ProductDescription } from "@/lib/catalog/productDetails.types";

export type ProductStatus = "draft" | "published";

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: string;
  dressStyle: string;
  price: number;
  discountPrice: number | null;
  discount: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colors: Color[];
  sizes: string[];
  stock: number;
  status: ProductStatus;
  createdAt: number;
  description: ProductDescription;
  faqs: FAQ[];
}

export type ProductSummary = Pick<Product, "id" | "name" | "price" | "rating" | "image"> &
  Partial<Pick<Product, "discountPrice" | "discount">>;

export type ProductInput = Omit<Product, "id">;

export interface ProductListOptions {
  includeDrafts?: boolean;
}
