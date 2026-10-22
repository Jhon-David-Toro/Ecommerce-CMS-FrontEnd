import { describe, expect, it } from "vitest";

import {
  buildSku,
  buildVariants,
  fromAdminProduct,
  fromAdminSummary,
  normalizeHex,
  splitStock,
  toProductRequest,
  toStorePrices,
} from "./catalog.mappers";
import type { ApiProduct } from "./catalog.remote.types";
import type { ProductInput } from "./product.types";

const input: ProductInput = {
  name: "One Life Tee",
  slug: "one-life-tee",
  brand: "Zara",
  category: "T-Shirts",
  dressStyle: "Casual",
  price: 150,
  discountPrice: 120,
  discount: 20,
  rating: 0,
  reviewsCount: 0,
  image: "https://img/main.jpg",
  images: ["https://img/extra.jpg", "  "],
  colors: [
    { name: "Navy", hex: "#1E3A8A" },
    { name: "White", hex: "white" },
  ],
  sizes: ["Small", "Large"],
  stock: 10,
  status: "draft",
  createdAt: 1,
  description: {
    overview: "Soft cotton",
    features: ["Organic", " "],
    origin: "Aruba",
    company: { name: "Thread", description: "We sew" },
    careInstructions: "Cold wash",
  },
  faqs: [
    { id: "a", question: "Wash?", answer: "Yes" },
    { id: "b", question: "", answer: "" },
  ],
};

const api: ApiProduct = {
  id: 7,
  name: "One Life Tee",
  slug: "one-life-tee",
  shortDescription: "Soft",
  thumbnailUrl: "https://img/main.jpg",
  price: 120,
  compareAtPrice: 150,
  status: "PUBLISHED",
  stock: 10,
  categoryName: "T-Shirts",
  brandName: "Zara",
  createdAt: 5,
  dressStyle: "Casual",
  ratingAverage: 4.5,
  ratingCount: 3,
  images: [
    { id: 1, imageUrl: "https://img/main.jpg", alt: null, main: true },
    { id: 2, imageUrl: "https://img/extra.jpg", alt: null, main: false },
  ],
  colors: [
    { id: 1, name: "Navy", hex: "#1E3A8A" },
    { id: 2, name: "Default", hex: "#000000" },
  ],
  sizes: [
    { id: 1, name: "Small", value: "Small" },
    { id: 2, name: "One size", value: "One size" },
  ],
  detail: { overview: "Soft cotton", origin: "Aruba", companyName: "Thread", aboutCompany: "We sew", careInstructions: "Cold wash" },
  features: ["Organic"],
  faqs: [{ question: "Wash?", answer: "Yes" }],
};

describe("normalizeHex", () => {
  it("keeps 6-digit hex, expands short ones and maps color names", () => {
    expect(normalizeHex("#1e3a8a")).toBe("#1e3a8a");
    expect(normalizeHex("#fa0")).toBe("#ffaa00");
    expect(normalizeHex("white")).toBe("#FFFFFF");
    expect(normalizeHex("unknown")).toBe("#000000");
  });
});

describe("stock and variants", () => {
  it("shares the stock between variants, remainder first", () => {
    expect(splitStock(10, 3)).toEqual([4, 3, 3]);
    expect(splitStock(0, 2)).toEqual([0, 0]);
  });

  it("builds readable SKUs", () => {
    expect(buildSku("one-life-tee", "Navy Blue", "X-Large")).toBe("ONE-LIFE-TEE-NAVY-BLUE-X-LARGE");
  });

  it("builds one variant per color and size and uses placeholders without options", () => {
    const variants = buildVariants({ slug: "tee", colors: input.colors, sizes: input.sizes, stock: 10 });
    expect(variants).toHaveLength(4);
    expect(variants.reduce((sum, variant) => sum + variant.stock, 0)).toBe(10);
    expect(buildVariants({ slug: "tee", colors: [], sizes: [], stock: 3 })).toEqual([
      { color: "Default", size: "One size", sku: "TEE-DEFAULT-ONE-SIZE", stock: 3 },
    ]);
  });
});

describe("toProductRequest", () => {
  it("turns the form into the API body", () => {
    const body = toProductRequest(input, { categoryId: 2, brandId: 3 });
    expect(body).toMatchObject({ price: 120, compareAtPrice: 150, categoryId: 2, brandId: 3, dressStyle: "Casual" });
    expect(body.images).toEqual([
      { imageUrl: "https://img/main.jpg", alt: "One Life Tee", main: true },
      { imageUrl: "https://img/extra.jpg", alt: "One Life Tee", main: false },
    ]);
    expect(body.colors[1]).toEqual({ name: "White", hex: "#FFFFFF" });
    expect(body.features).toEqual(["Organic"]);
    expect(body.faqs).toEqual([{ question: "Wash?", answer: "Yes" }]);
    expect(body.detail.companyName).toBe("Thread");
  });

  it("sends no compare-at price without a real discount", () => {
    expect(toProductRequest({ ...input, discountPrice: null }, { categoryId: null, brandId: null })).toMatchObject({
      price: 150,
      compareAtPrice: null,
    });
    expect(toProductRequest({ ...input, discountPrice: 200 }, { categoryId: null, brandId: null })).toMatchObject({
      price: 150,
      compareAtPrice: null,
    });
  });
});

describe("from the API", () => {
  it("splits current and compare-at prices into the regular and discount prices", () => {
    expect(toStorePrices(120, 150)).toEqual({ price: 150, discountPrice: 120, discount: 20 });
    expect(toStorePrices(120, null)).toEqual({ price: 120, discountPrice: null, discount: 0 });
  });

  it("builds a store product from the admin product, hiding placeholders", () => {
    const product = fromAdminProduct(api);
    expect(product).toMatchObject({
      id: 7,
      brand: "Zara",
      category: "T-Shirts",
      price: 150,
      discountPrice: 120,
      status: "published",
      rating: 4.5,
    });
    expect(product.image).toBe("https://img/main.jpg");
    expect(product.images).toEqual(["https://img/extra.jpg"]);
    expect(product.colors).toEqual([{ name: "Navy", hex: "#1E3A8A" }]);
    expect(product.sizes).toEqual(["Small"]);
    expect(product.description.company.name).toBe("Thread");
    expect(product.faqs[0]).toMatchObject({ question: "Wash?", answer: "Yes" });
  });

  it("treats archived products as drafts and builds rows from summaries", () => {
    expect(fromAdminProduct({ ...api, status: "ARCHIVED" }).status).toBe("draft");
    const row = fromAdminSummary({
      id: 1,
      name: "A",
      slug: "a",
      thumbnailUrl: null,
      price: 10,
      compareAtPrice: null,
      status: "DRAFT",
      stock: 4,
      categoryName: null,
      brandName: null,
      createdAt: 2,
    });
    expect(row).toMatchObject({ id: 1, image: "", category: "", stock: 4, status: "draft", price: 10 });
  });
});
