import { useState } from "react";

import type { Product } from "@/lib/catalog/product.types";
import { useCart } from "@/lib/cart/useCart";

import { buildCartItem } from "../ProductInfo.utils";

/**
 * Keeps the options a shopper picks for a product (color, size, quantity) and adds the choice to the cart.
 *
 * @param product Product being viewed.
 * @returns The selected options, their setters, the add action and whether the last add succeeded.
 */
export const useProductOptions = (product: Product) => {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  /**
   * Puts the current choice in the cart.
   */
  const add = () => {
    addItem(buildCartItem(product, { color: selectedColor, size: selectedSize, quantity }));
    setAdded(true);
  };

  /**
   * Wraps a setter so changing an option hides the "added" notice.
   *
   * @param setter State setter of an option.
   * @returns A setter that also clears the notice.
   */
  const resetting =
    <T>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setAdded(false);
    };

  return {
    selectedColor,
    selectedSize,
    quantity,
    added,
    add,
    setColor: resetting(setSelectedColor),
    setSize: resetting(setSelectedSize),
    setQuantity: resetting(setQuantity),
  };
};
