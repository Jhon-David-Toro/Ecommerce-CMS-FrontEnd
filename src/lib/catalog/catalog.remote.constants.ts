export const PLACEHOLDER_COLOR = { name: "Default", hex: "#000000" };

export const PLACEHOLDER_SIZE = "One size";

export const NAMED_HEX: Record<string, string> = { white: "#FFFFFF", black: "#000000" };

export const FALLBACK_HEX = "#000000";

export const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

export const SHORT_HEX_PATTERN = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/;

export const ADMIN_PAGE_SIZE = 100;

export const MAX_SKU_LENGTH = 120;

export const API_STATUS_TO_FRONT = { DRAFT: "draft", PUBLISHED: "published", ARCHIVED: "draft" } as const;

export const API_PATHS = {
  catalog: "/api/public/catalog",
  products: "/api/admin/products",
} as const;

export const STATUS_ACTIONS: Record<string, string> = {
  "DRAFT->published": "publish",
  "PUBLISHED->draft": "unpublish",
  "ARCHIVED->draft": "restore",
};

export const EMPTY_DETAIL = { overview: null, origin: null, companyName: null, aboutCompany: null, careInstructions: null };
