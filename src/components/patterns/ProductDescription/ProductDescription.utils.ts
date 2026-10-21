import type { ProductDescription } from "@/lib/catalog/productDetails.types";

import { SECTION_KINDS, SECTION_TITLES } from "./ProductDescription.constants";
import type { DescriptionSectionData } from "./ProductDescription.types";

/**
 * Lists the sections shown in the product description, in display order.
 *
 * @param description Description of the product.
 * @returns One entry per section with its title, kind and content.
 */
export const buildSections = (description: ProductDescription): DescriptionSectionData[] => [
  { title: SECTION_TITLES.overview, kind: SECTION_KINDS.text, items: [description.overview] },
  { title: SECTION_TITLES.features, kind: SECTION_KINDS.list, items: description.features },
  { title: SECTION_TITLES.origin, kind: SECTION_KINDS.text, items: [description.origin] },
  {
    title: SECTION_TITLES.company,
    kind: SECTION_KINDS.text,
    items: [description.company.name, description.company.description],
    emphasizeFirst: true,
  },
  { title: SECTION_TITLES.care, kind: SECTION_KINDS.text, items: [description.careInstructions] },
];
