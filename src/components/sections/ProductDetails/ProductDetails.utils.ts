/**
 * Builds the breadcrumb trail of a product page.
 *
 * @param name Name of the product.
 * @returns The trail: Home, Shop and the product.
 */
export const getProductTrail = (name: string) => [{ label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: name }];
