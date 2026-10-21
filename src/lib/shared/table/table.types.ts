export interface TableControlsOptions<T> {
  pageSize: number;
  initialQuery?: string;
  matches: (row: T, text: string) => boolean;
}
