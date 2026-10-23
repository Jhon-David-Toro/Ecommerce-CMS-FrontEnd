import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { DEFAULT_CONTENT } from "./content.constants";
import { getContent, getPublishedPage, listPages, resetContent, saveContent } from "./content.remote";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const admin = { id: 1, name: "Admin", email: "a@shop.test", role: "admin" as const, blocked: false, createdAt: 1 };

describe("content and pages against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({ user: null, isReady: true });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("merges the saved content over the defaults, and uses the defaults for an empty answer", async () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(200, { footerTagline: "Saved tagline" })));
    const content = await getContent();
    expect(content.footerTagline).toBe("Saved tagline");
    expect(content.hero).toEqual(DEFAULT_CONTENT.hero);

    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(200, {})));
    expect(await getContent()).toEqual(DEFAULT_CONTENT);
  });

  it("falls back to the defaults when the API cannot be reached", async () => {
    fetchMock.mockRejectedValue(new TypeError("network"));
    expect(await getContent()).toEqual(DEFAULT_CONTENT);
  });

  it("saves with PUT and resets with DELETE", async () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(200, DEFAULT_CONTENT)));
    await saveContent(DEFAULT_CONTENT);
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(204)));
    expect(await resetContent()).toEqual(DEFAULT_CONTENT);
    expect(fetchMock.mock.calls.map(([path, options]) => `${options.method} ${path}`)).toEqual([
      "PUT /api/admin/content",
      "DELETE /api/admin/content",
    ]);
  });

  it("lists published pages for shoppers and every page for administrators", async () => {
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, [])));
    await listPages();
    useAuthStore.setState({ user: admin });
    await listPages();
    expect(fetchMock.mock.calls.map(([path]) => path)).toEqual(["/api/public/pages", "/api/admin/pages"]);
  });

  it("finds a published page by slug and answers null when it is missing", async () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(200, { id: 1, slug: "about" })));
    expect(await getPublishedPage("about")).toEqual({ id: 1, slug: "about" });
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(404, { code: "PAGE_NOT_FOUND", message: "no" })));
    expect(await getPublishedPage("secret")).toBeNull();
  });
});
