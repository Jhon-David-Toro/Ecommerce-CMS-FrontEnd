export const CHECKOUT_TRAIL = [{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }];

export const ORDER_ERROR = "We could not place your order. Please try again.";

export const EMPTY_CHECKOUT_CART = {
  title: "Your cart is empty",
  description: "Add something to your cart before checking out.",
  actionLabel: "Continue shopping",
  actionHref: "/products",
};

export const DETAILS_STEP = 2;

export const ITEM_IMAGE_SIZE = { width: 64, height: 64 } as const;
