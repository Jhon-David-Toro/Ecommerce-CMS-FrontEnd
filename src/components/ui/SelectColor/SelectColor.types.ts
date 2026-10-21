import { Color } from "@/lib/catalog/color.types";

export interface ColorSelectorProps {
    colors: Color[];
    selectedColor: string;
    onColorChange: (colorName: string) => void;
}