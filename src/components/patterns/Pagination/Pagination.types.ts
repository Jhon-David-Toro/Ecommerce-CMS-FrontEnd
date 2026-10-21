export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PageElement {
  key: string | number;
  content: string | number;
  isActive?: boolean;
  isEllipsis?: boolean;
  onClick?: () => void;
}

export interface PageRange {
  startPage: number;
  endPage: number;
}

export interface PageElementsParams {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean;
}

export interface PaginationItemProps {
  element: PageElement;
}
