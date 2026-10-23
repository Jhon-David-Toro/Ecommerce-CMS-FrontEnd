import { Suspense } from "react";

import { Products } from "@/components/sections/Products";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Products page; the address can narrow it with a search text, a view or a brand.
 *
 * @returns The products listing.
 */
const ProductsPage = () => (
  <Suspense fallback={<Spinner />}>
    <Products />
  </Suspense>
);

export default ProductsPage;

export const metadata = { title: "Products" };
