export interface TableControlsOptions<T> {
  pageSize: number;
  matches: (row: T, text: string) => boolean;
}
