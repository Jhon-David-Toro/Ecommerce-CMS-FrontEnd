import type { ProductFormValues } from "./AdminProductForm.types";

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: "",
  slug: "",
  brand: "",
  category: "",
  dressStyle: "Casual",
  price: "",
  discountPrice: "",
  stock: "0",
  status: "draft",
  image: "",
  images: "",
  colors: "Black,black",
  sizes: ["Medium"],
  overview: "",
  features: "",
  origin: "",
  companyName: "",
  companyDescription: "",
  careInstructions: "",
  faqs: "",
};

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft (hidden from the store)" },
  { value: "published", label: "Published" },
];

export const LINE_SEPARATOR = "|";

export const COLOR_SEPARATOR = ",";

export const NO_ARGS = undefined;

export const LIST_ROUTE = "/admin/products";

export const SAVE_ERROR = "The product could not be saved.";

export const CHOOSE_OPTION = { value: "", label: "Choose..." };

export const NOT_FOUND = {
  title: "Product not found",
  description: "That product does not exist.",
  backLabel: "Back to products",
  backHref: LIST_ROUTE,
};
