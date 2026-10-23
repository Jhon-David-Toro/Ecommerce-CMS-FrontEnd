import { beforeEach, describe, expect, it } from "vitest";

import { findPromoPercent } from "@/lib/settings/settings.utils";

import type { CartItem } from "./cart.types";
import { addToItems, calculateTotals, clampQuantity, countItems, getItemKey, removeFromItems, setItemQuantity } from "./cart.utils";
import { useCartStore } from "./cartStore";

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  productId: 1,
  name: "Shirt",
  image: "/x.png",
  price: 50,
  quantity: 1,
  color: "Blue",
  size: "Large",
  stock: 5,
  ...overrides,
});

describe("cart utils", () => {
  it("tells lines apart by product, color and size", () => {
    expect(getItemKey(item())).toBe("1-Blue-Large");
    expect(getItemKey(item({ size: "Small" }))).not.toBe(getItemKey(item()));
  });

  it("keeps quantities between one and the stock", () => {
    expect(clampQuantity(0, 5)).toBe(1);
    expect(clampQuantity(9, 5)).toBe(5);
    expect(clampQuantity(50, 99)).toBe(10);
  });

  it("merges the same line and keeps different ones apart", () => {
    const merged = addToItems([item()], item({ quantity: 2 }));
    expect(merged).toHaveLength(1);
    expect(merged[0].quantity).toBe(3);
    expect(addToItems([item()], item({ color: "Red" }))).toHaveLength(2);
  });

  it("never adds more than the stock", () => {
    expect(addToItems([item({ quantity: 4 })], item({ quantity: 4 }))[0].quantity).toBe(5);
  });

  it("changes and removes lines", () => {
    expect(setItemQuantity([item()], "1-Blue-Large", 3)[0].quantity).toBe(3);
    expect(removeFromItems([item()], "1-Blue-Large")).toEqual([]);
  });

  it("counts units", () => {
    expect(countItems([item({ quantity: 2 }), item({ productId: 2, quantity: 3 })])).toBe(5);
  });

  it("calculates the totals with discount and shipping", () => {
    const totals = calculateTotals({
      items: [item({ price: 100, quantity: 2 })],
      shippingFee: 15,
      freeShippingOver: 300,
      discountPercent: 20,
    });
    expect(totals).toEqual({ subtotal: 200, discount: 40, shipping: 15, total: 175 });
  });

  it("makes shipping free over the threshold and for an empty cart", () => {
    expect(calculateTotals({ items: [item({ price: 400 })], shippingFee: 15, freeShippingOver: 300, discountPercent: 0 }).shipping).toBe(0);
    expect(calculateTotals({ items: [], shippingFee: 15, freeShippingOver: 300, discountPercent: 0 }).total).toBe(0);
  });
});

describe("promo codes", () => {
  it("finds a code ignoring case and spaces", () => {
    expect(findPromoPercent([{ code: "SHOP20", percent: 20 }], " shop20 ")).toBe(20);
    expect(findPromoPercent([{ code: "SHOP20", percent: 20 }], "nope")).toBe(0);
  });
});

describe("cart store", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useCartStore.setState({ items: [], promoCode: "", isReady: false });
  });

  it("adds, changes and removes lines", () => {
    const { addItem, setQuantity, removeItem } = useCartStore.getState();
    addItem(item());
    setQuantity("1-Blue-Large", 3);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
    removeItem("1-Blue-Large");
    expect(useCartStore.getState().items).toEqual([]);
  });

  it("restores a saved cart when hydrated", () => {
    useCartStore.getState().addItem(item());
    useCartStore.getState().applyPromo("SHOP20");
    useCartStore.setState({ items: [], promoCode: "", isReady: false });
    useCartStore.getState().hydrate();
    expect(useCartStore.getState()).toMatchObject({ isReady: true, promoCode: "SHOP20" });
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("empties the cart", () => {
    useCartStore.getState().addItem(item());
    useCartStore.getState().clear();
    expect(useCartStore.getState().items).toEqual([]);
  });
});
