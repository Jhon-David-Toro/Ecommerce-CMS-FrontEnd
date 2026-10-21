import { Suspense } from "react";

import { Products } from "@/components/sections/Products";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Search results page: the products page narrowed by the `q` text of the address.
 *
 * @returns The products that match the search.
 */
const SearchPage = () => (
  <Suspense fallback={<Spinner />}>
    <Products />
  </Suspense>
);

export default SearchPage;

export const metadata = { title: "Search" };
