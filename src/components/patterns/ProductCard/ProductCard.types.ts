import type { Product } from "@/lib/catalog/product.types";

export type ProductCardProps = Pick<Product, "id" | "name" | "price" | "discountPrice" | "rating" | "image" | "discount">;
