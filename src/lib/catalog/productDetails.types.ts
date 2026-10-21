export interface ProductDescription {
  overview: string;
  features: string[];
  origin: string;
  company: {
    name: string;
    description: string;
  };
  careInstructions: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountPrice: number;
  discount: number;
  description: ProductDescription;
  mainImage: string;
  additionalImages: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
}
