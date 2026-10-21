import type { Dispatch, SetStateAction } from "react";

import type { ProductDetail } from "@/lib/catalog/productDetails.types";

export interface ProductInfoProps {
  product: ProductDetail;
}

export interface ProductInfoSummaryProps {
  product: ProductDetail;
}

export interface ProductInfoOptionsProps {
  product: ProductDetail;
  selectedColor: string;
  onColorChange: (color: string) => void;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export interface ProductInfoPurchaseProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}
