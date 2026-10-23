import type { Product } from "@/lib/catalog/product.types";

export interface ProductInfoProps {
  product: Product;
}

export interface ProductInfoSummaryProps {
  product: Product;
}

export interface ProductInfoOptionsProps {
  product: Product;
  selectedColor: string;
  onColorChange: (color: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export interface ProductInfoPurchaseProps {
  quantity: number;
  stock: number;
  added: boolean;
  onQuantityChange: (quantity: number) => void;
  onAdd: () => void;
}

export interface PickedOptions {
  color: string;
  size: string;
  quantity: number;
}
