import type { CartItem } from "@/lib/cart/cart.types";
import type { Product } from "@/lib/catalog/product.types";

import type { PickedOptions } from "./ProductInfo.types";

/**
 * Builds the cart line for a product with the options the shopper picked.
 *
 * @param product Product being bought.
 * @param options Picked color, size and quantity.
 * @returns The cart line, priced with the discount when there is one.
 */
export const buildCartItem = (product: Product, { color, size, quantity }: PickedOptions): CartItem => ({
  productId: product.id,
  name: product.name,
  image: product.image,
  price: product.discountPrice ?? product.price,
  quantity,
  color,
  size,
  stock: product.stock,
});
