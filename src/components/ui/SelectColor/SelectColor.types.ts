import type { Color } from "@/lib/catalog/color.types";

export interface SelectColorProps {
  colors: Color[];
  selectedColor: string;
  onColorChange: (colorName: string) => void;
}
