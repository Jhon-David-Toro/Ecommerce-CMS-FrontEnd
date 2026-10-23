export interface ShowingTextParams {
  currentPage: number;
  productsPerPage: number;
  totalProducts: number;
}

export interface TitleAllProductsProps extends ShowingTextParams {
  heading?: string;
}
