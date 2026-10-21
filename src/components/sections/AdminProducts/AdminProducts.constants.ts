export const ALL_PRODUCTS = { includeDrafts: true };

export const PAGE_SIZE = 10;

export const THUMBNAIL_SIZE = { width: 40, height: 40 } as const;

export const STATUS_FILTERS = [
  { value: "", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];
