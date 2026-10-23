import type { ReactNode } from "react";

export interface TableToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  children?: ReactNode;
}
