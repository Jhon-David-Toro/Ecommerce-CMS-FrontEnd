import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { deleteProduct, findIdByName, getProduct, listProducts, saveProduct, syncStatus, updateProduct } from "./catalog.remote";
import type { ApiProduct } from "./catalog.remote.types";
import type { ProductInput } from "./product.types";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const apiProduct = (overrides: Partial<ApiProduct> = {}): ApiProduct => ({
  id: 1,
  name: "Tee",
  slug: "tee",
  shortDescription: null,
  thumbnailUrl: "https://img/a.jpg",
  price: 100,
  compareAtPrice: null,
  status: "DRAFT",
  stock: 5,
  categoryName: "T-Shirts",
  brandName: "Zara",
  createdAt: 1,
  dressStyle: "Casual",
  ratingAverage: 0,
  ratingCount: 0,
  images: [{ id: 1, imageUrl: "https://img/a.jpg", alt: null, main: true }],
  colors: [],
  sizes: [],
  detail: null,
  features: [],
  faqs: [],
  ...overrides,
});

const input: ProductInput = {
  name: "Tee",
  slug: "tee",
  brand: "zara",
  category: "T-Shirts",
  dressStyle: "Casual",
  price: 100,
  discountPrice: null,
  discount: 0,
  rating: 0,
  reviewsCount: 0,
  image: "https://img/a.jpg",
  images: [],
  colors: [],
  sizes: [],
  stock: 5,
  status: "draft",
  createdAt: 1,
  description: { overview: "", features: [], origin: "", company: { name: "", description: "" }, careInstructions: "" },
  faqs: [],
};

const admin = { id: 1, name: "Admin", email: "a@shop.test", role: "admin" as const, blocked: false, createdAt: 1 };

describe("catalog against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({ user: null, isReady: true });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("finds taxonomy ids by name, ignoring case", () => {
    expect(findIdByName([{ id: 3, name: "Zara" }], " zara ")).toBe(3);
    expect(findIdByName([{ id: 3, name: "Zara" }], "Gucci")).toBeNull();
  });

  it("lists the public catalog for shoppers, even when drafts are asked for", async () => {
    fetchMock.mockResolvedValue(answer(200, [{ id: 1 }]));
    expect(await listProducts({ includeDrafts: true })).toEqual([{ id: 1 }]);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/catalog");
  });

  it("lists every admin page, drafts included", async () => {
    useAuthStore.setState({ user: admin });
    const row = {
      id: 1,
      name: "A",
      slug: "a",
      thumbnailUrl: null,
      price: 10,
      compareAtPrice: null,
      status: "DRAFT",
      stock: 1,
      categoryName: null,
      brandName: null,
      createdAt: 1,
    };
    fetchMock
      .mockResolvedValueOnce(answer(200, { content: [row], last: false }))
      .mockResolvedValueOnce(answer(200, { content: [{ ...row, id: 2 }], last: true }));
    const products = await listProducts({ includeDrafts: true });
    expect(products.map((product) => product.id)).toEqual([1, 2]);
    expect(fetchMock.mock.calls.map(([path]) => path)).toEqual([
      "/api/admin/products?page=0&size=100",
      "/api/admin/products?page=1&size=100",
    ]);
  });

  it("reads one product from the public feed or the admin API and answers null when missing", async () => {
    fetchMock.mockResolvedValueOnce(answer(200, { id: 4 }));
    expect(await getProduct(4)).toEqual({ id: 4 });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/catalog/4");

    useAuthStore.setState({ user: admin });
    fetchMock.mockResolvedValueOnce(answer(404, { code: "PRODUCT_NOT_FOUND", message: "no" }));
    expect(await getProduct(9)).toBeNull();
    expect(fetchMock.mock.calls[1][0]).toBe("/api/admin/products/9");
  });

  it("creates a product with the ids of its category and brand and publishes it when asked", async () => {
    useAuthStore.setState({ user: admin });
    fetchMock.mockResolvedValueOnce(answer(201, apiProduct())).mockResolvedValueOnce(answer(200, apiProduct({ status: "PUBLISHED" })));

    const saved = await saveProduct({ ...input, status: "published" });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({ categoryId: 1, brandId: 2, name: "Tee" });
    expect(fetchMock.mock.calls[1][0]).toBe("/api/admin/products/1/publish");
    expect(saved.status).toBe("published");
  });

  it("moves a published product back to draft or restores an archived one", async () => {
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, apiProduct())));
    await syncStatus(apiProduct({ status: "PUBLISHED" }), "draft");
    expect(fetchMock.mock.calls[0][0]).toBe("/api/admin/products/1/unpublish");
    await syncStatus(apiProduct({ status: "ARCHIVED" }), "draft");
    expect(fetchMock.mock.calls[1][0]).toBe("/api/admin/products/1/restore");
    expect((await syncStatus(apiProduct(), "draft")).status).toBe("DRAFT");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("archives a published product before deleting it", async () => {
    fetchMock
      .mockResolvedValueOnce(answer(200, apiProduct({ status: "PUBLISHED" })))
      .mockResolvedValueOnce(answer(200, apiProduct({ status: "ARCHIVED" })))
      .mockResolvedValueOnce(answer(204));
    await deleteProduct(1);
    expect(fetchMock.mock.calls.map(([path, options]) => `${options.method ?? "GET"} ${path}`)).toEqual([
      "GET /api/admin/products/1",
      "POST /api/admin/products/1/archive",
      "DELETE /api/admin/products/1",
    ]);
  });

  it("leaves a product untouched when a shopper's order or review tries to change it", async () => {
    fetchMock.mockResolvedValue(answer(200, { id: 1, stock: 5 }));
    expect(await updateProduct(1, { stock: 4 })).toEqual({ id: 1, stock: 5 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
