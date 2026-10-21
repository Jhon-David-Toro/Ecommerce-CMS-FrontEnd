import { useQuery } from "@/lib/shared/async/useQuery";

import { getContent } from "./content.api";
import { DEFAULT_CONTENT } from "./content.constants";

/**
 * Gives the editable storefront content, showing the defaults until the saved content arrives.
 *
 * @returns The site content.
 */
export const useSiteContent = () => {
  const { data } = useQuery(getContent, undefined);
  return data ?? DEFAULT_CONTENT;
};
