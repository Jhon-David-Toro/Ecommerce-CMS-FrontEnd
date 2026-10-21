import { beforeEach, describe, expect, it } from "vitest";

import { buildProduct } from "@/test/factories";

import { deleteProduct, getProduct, listProducts, saveProduct } from "./catalog.api";
import { getNewArrivals, getRelated, getTopSelling, isLowStock, searchProducts } from "./catalog.utils";
import { createReview, deleteReview, listReviews, setReviewStatus } from "./reviews.api";

const products = [
  buildProduct({ id: 1, createdAt: 1, rating: 3 }),
  buildProduct({ id: 2, createdAt: 3, rating: 5 }),
  buildProduct({ id: 3, createdAt: 2, rating: 4 }),
];

describe("catalog utils", () => {
  it("picks the newest products", () => {
    expect(getNewArrivals(products, 2).map((product) => product.id)).toEqual([2, 3]);
  });

  it("picks the best rated products", () => {
    expect(getTopSelling(products, 2).map((product) => product.id)).toEqual([2, 3]);
  });

  it("recommends other products", () => {
    expect(getRelated(products, 2, 5).map((product) => product.id)).toEqual([3, 1]);
  });

  it("detects low stock", () => {
    expect(isLowStock(buildProduct({ stock: 3 }), 10)).toBe(true);
    expect(isLowStock(buildProduct({ stock: 30 }), 10)).toBe(false);
  });
});

describe("searchProducts", () => {
  const list = [
    buildProduct({ id: 1, name: "Skinny Fit Jeans", brand: "Zara" }),
    buildProduct({ id: 2, name: "Gradient Shirt", category: "Shirts", brand: "Gucci" }),
  ];

  it("matches any field, ignoring case", () => {
    expect(searchProducts(list, "JEANS").map((p) => p.id)).toEqual([1]);
    expect(searchProducts(list, "gucci").map((p) => p.id)).toEqual([2]);
  });

  it("needs every word to match", () => {
    expect(searchProducts(list, "skinny gucci")).toEqual([]);
  });

  it("returns everything for an empty query", () => {
    expect(searchProducts(list, "  ")).toHaveLength(2);
  });
});

describe("catalog api", () => {
  beforeEach(() => window.localStorage.clear());

  it("seeds the catalog from the legacy mock data", async () => {
    const all = await listProducts();
    expect(all.length).toBeGreaterThan(10);
    expect(all.every((product) => product.colors.length > 0 && product.sizes.length > 0)).toBe(true);
  });

  it("hides drafts from the storefront but not from the admin", async () => {
    const { id, ...draft } = buildProduct({ status: "draft", name: "Draft only" });
    void id;
    const saved = await saveProduct(draft);
    expect((await listProducts()).some((product) => product.id === saved.id)).toBe(false);
    expect((await listProducts({ includeDrafts: true })).some((product) => product.id === saved.id)).toBe(true);
  });

  it("updates and deletes a product", async () => {
    await saveProduct({ ...(await getProduct(1))!, name: "Renamed" }, 1);
    expect((await getProduct(1))!.name).toBe("Renamed");
    await deleteProduct(1);
    expect(await getProduct(1)).toBeNull();
  });
});

describe("reviews api", () => {
  beforeEach(() => window.localStorage.clear());

  it("lists the approved reviews of a product", async () => {
    const reviews = await listReviews({ productId: 1, status: "approved" });
    expect(reviews.length).toBeGreaterThan(0);
  });

  it("keeps a new review pending and recalculates the rating once it is approved", async () => {
    const before = (await getProduct(2))!;
    const created = await createReview({
      productId: 2,
      author: "Ana",
      rating: 5,
      text: "Great",
      date: new Date().toISOString(),
      verified: false,
      status: "pending",
    });
    expect((await getProduct(2))!.reviewsCount).toBe(before.reviewsCount);
    await setReviewStatus(created.id, "approved");
    expect(await getProduct(2)).toMatchObject({ rating: 5, reviewsCount: 1 });
    await deleteReview(created.id);
    expect((await getProduct(2))!.reviewsCount).toBe(0);
  });
});
