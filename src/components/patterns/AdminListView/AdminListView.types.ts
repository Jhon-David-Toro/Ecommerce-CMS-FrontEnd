import type { ReactNode } from "react";

import type { Column } from "@/components/patterns/DataTable/DataTable.types";

export interface ListControls<T> {
  query: string;
  setQuery: (query: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  pageRows: T[];
}

export interface ListTable<T> {
  caption: string;
  emptyTitle: string;
  columns: Column<T>[];
  getRowKey: (row: T) => string | number;
}

export interface AdminListViewProps<T> {
  title: string;
  description: string;
  actions?: ReactNode;
  searchLabel: string;
  filters?: ReactNode;
  controls: ListControls<T>;
  table: ListTable<T>;
  children?: ReactNode;
}
