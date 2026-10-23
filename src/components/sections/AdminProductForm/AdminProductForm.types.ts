import type { Product, ProductStatus } from "@/lib/catalog/product.types";
import type { FieldProps, Errors } from "@/lib/shared/forms/forms.types";

export interface ProductFormValues {
  name: string;
  slug: string;
  brand: string;
  category: string;
  dressStyle: string;
  price: string;
  discountPrice: string;
  stock: string;
  status: ProductStatus;
  image: string;
  images: string;
  colors: string;
  sizes: string[];
  overview: string;
  features: string;
  origin: string;
  companyName: string;
  companyDescription: string;
  careInstructions: string;
  faqs: string;
}

export interface AdminProductFormProps {
  productId?: number;
}

export interface ProductFormBodyProps {
  existing?: Product;
}

export interface ProductFormHeaderProps {
  title: string;
  isSaving: boolean;
  failure: string;
}

export interface FieldGroupProps {
  field: (name: keyof ProductFormValues & string) => FieldProps;
  errors: Errors;
}

export interface MediaFieldsProps extends FieldGroupProps {
  sizes: string[];
  onSizesChange: (sizes: string[]) => void;
}

export interface SizeCheckboxesProps {
  sizes: string[];
  error?: string;
  onSizesChange: (sizes: string[]) => void;
}
