import type { ReactNode } from "react";

export interface NotFoundConfig {
  title: string;
  description?: string;
  backLabel: string;
  backHref: string;
}

export interface RecordGateProps<T> {
  record: T | null | undefined;
  isLoading: boolean;
  loadingLabel: string;
  notFound: NotFoundConfig;
  children: (record: T) => ReactNode;
}
