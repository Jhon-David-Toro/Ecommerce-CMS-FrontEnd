import type { ProductDescription as ProductDescriptionData } from "@/lib/catalog/productDetails.types";

import type { SECTION_KINDS } from "./ProductDescription.constants";

export interface ProductDescriptionProps {
  description: ProductDescriptionData;
}

export interface DescriptionSectionData {
  title: string;
  kind: (typeof SECTION_KINDS)[keyof typeof SECTION_KINDS];
  items: string[];
  emphasizeFirst?: boolean;
}

export interface DescriptionSectionProps {
  section: DescriptionSectionData;
}

export interface DescriptionListProps {
  items: string[];
}
