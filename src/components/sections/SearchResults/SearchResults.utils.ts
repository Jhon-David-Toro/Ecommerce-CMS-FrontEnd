/**
 * Writes the headline of the search page.
 *
 * @param query Text the shopper searched for.
 * @returns The results headline, or a generic one without a query.
 */
export const getSearchTitle = (query: string) => (query ? `RESULTS FOR "${query.toUpperCase()}"` : "SEARCH");
