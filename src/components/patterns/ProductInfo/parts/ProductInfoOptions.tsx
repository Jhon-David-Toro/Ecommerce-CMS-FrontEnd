import { SizeSelector } from "@/components/patterns/SizeSelector";
import { Divider } from "@/components/ui/Divider";
import { SelectColor } from "@/components/ui/SelectColor";

import type { ProductInfoOptionsProps } from "../ProductInfo.types";

/**
 * ProductInfo/Options: color and size selectors separated by dividers.
 *
 * @param props Component props.
 * @param props.product Product that offers the colors and sizes.
 * @param props.selectedColor Selected color name.
 * @param props.onColorChange Called with the color the user picks.
 * @param props.selectedSize Selected size.
 * @param props.onSizeChange Called with the size the user picks.
 * @returns The option selectors.
 */
export const ProductInfoOptions = ({ product, selectedColor, onColorChange, selectedSize, onSizeChange }: ProductInfoOptionsProps) => (
  <>
    <Divider />
    <SelectColor colors={product.colors} selectedColor={selectedColor} onColorChange={onColorChange} />
    <Divider />
    <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSizeChange={onSizeChange} />
    <Divider />
  </>
);
