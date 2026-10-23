import type { ColorOption } from "@/lib/catalog/filters/filters.types";

export interface ColorFilterProps {
  options: ColorOption[];
}

export interface ColorSwatchProps {
  color: ColorOption;
  isSelected: boolean;
  onToggle: () => void;
}
