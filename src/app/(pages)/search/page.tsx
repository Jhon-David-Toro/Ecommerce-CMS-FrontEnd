import { Suspense } from "react";

import { SearchResults } from "@/components/sections/SearchResults";
import { Spinner } from "@/components/ui/Spinner";

/**
 * Search results page.
 *
 * @returns The products that match the search.
 */
const SearchPage = () => (
  <Suspense fallback={<Spinner />}>
    <SearchResults />
  </Suspense>
);

export default SearchPage;

export const metadata = { title: "Search" };
