import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAuthStore } from "@/lib/auth/authStore";

import { DEFAULT_SETTINGS } from "./settings.constants";
import { getSettings, lookupPromoPercent, saveSettings } from "./settings.remote";

const answer = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const admin = { id: 1, name: "Admin", email: "a@shop.test", role: "admin" as const, blocked: false, createdAt: 1 };

describe("settings against the API", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    useAuthStore.setState({ user: null, isReady: true });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("reads the public settings for shoppers, with no promo codes of their own", async () => {
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, { storeName: "My Shop", shippingFee: 9 })));
    const settings = await getSettings();
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/settings");
    expect(settings).toMatchObject({
      storeName: "My Shop",
      shippingFee: 9,
      freeShippingOver: DEFAULT_SETTINGS.freeShippingOver,
      promoCodes: [],
    });
  });

  it("reads every setting for administrators", async () => {
    useAuthStore.setState({ user: admin });
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, { ...DEFAULT_SETTINGS, lowStockThreshold: 3 })));
    expect((await getSettings()).lowStockThreshold).toBe(3);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/admin/settings");
  });

  it("keeps the store working with the defaults when the API cannot be reached", async () => {
    fetchMock.mockRejectedValue(new TypeError("network"));
    expect(await getSettings()).toEqual({ ...DEFAULT_SETTINGS, promoCodes: [] });
  });

  it("saves the settings with PUT", async () => {
    fetchMock.mockImplementation(() => Promise.resolve(answer(200, DEFAULT_SETTINGS)));
    await saveSettings(DEFAULT_SETTINGS);
    expect(fetchMock.mock.calls[0]).toEqual(["/api/admin/settings", expect.objectContaining({ method: "PUT" })]);
  });

  it("looks up the percentage of a promo code and answers 0 for empty or unknown ones", async () => {
    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(200, { code: "SHOP20", percent: 20 })));
    expect(await lookupPromoPercent(" SHOP20 ")).toBe(20);
    expect(fetchMock.mock.calls[0][0]).toBe("/api/public/promo-codes/SHOP20");

    fetchMock.mockImplementationOnce(() => Promise.resolve(answer(404, { code: "PROMO_NOT_FOUND", message: "no" })));
    expect(await lookupPromoPercent("NOPE")).toBe(0);
    expect(await lookupPromoPercent("  ")).toBe(0);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
