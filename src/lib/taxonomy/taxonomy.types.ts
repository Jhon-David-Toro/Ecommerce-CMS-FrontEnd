export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  visible: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  visible: boolean;
}

export type CategoryInput = Omit<Category, "id">;

export type BrandInput = Omit<Brand, "id">;
