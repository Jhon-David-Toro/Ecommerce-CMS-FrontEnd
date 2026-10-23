export interface HomeCategoryItem {
  title: string;
  image: string;
  link: string;
  twoColumn?: boolean;
}

export interface HomeCategoryCardProps {
  category: HomeCategoryItem;
}

export interface HomeCategoryProps {
  items: HomeCategoryItem[];
}
