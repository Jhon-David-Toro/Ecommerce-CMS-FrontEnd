import { beforeEach, describe, expect, it } from "vitest";

import { getSettings, saveSettings } from "@/lib/settings/settings.api";

import { getContent, getPublishedPage, pageRepository, resetContent, saveContent } from "./content.api";

describe("content api", () => {
  beforeEach(() => window.localStorage.clear());

  it("returns the default content at first", async () => {
    const content = await getContent();
    expect(content.hero.ctaHref).toBe("/products");
    expect(content.navbar.length).toBeGreaterThan(0);
  });

  it("saves and resets the content", async () => {
    const content = await getContent();
    await saveContent({ ...content, hero: { ...content.hero, title: "NEW TITLE" } });
    expect((await getContent()).hero.title).toBe("NEW TITLE");
    await resetContent();
    expect((await getContent()).hero.title).toBe("FIND CLOTHES THAT MATCHES YOUR STYLE");
  });

  it("serves only published pages by slug", async () => {
    expect((await getPublishedPage("about"))?.title).toBe("About us");
    await pageRepository.update(1, { published: false });
    expect(await getPublishedPage("about")).toBeNull();
    expect(await getPublishedPage("missing")).toBeNull();
  });
});

describe("settings api", () => {
  beforeEach(() => window.localStorage.clear());

  it("falls back to the defaults and keeps saved changes", async () => {
    const settings = await getSettings();
    expect(settings.currency).toBe("USD");
    await saveSettings({ ...settings, shippingFee: 9 });
    expect((await getSettings()).shippingFee).toBe(9);
  });
});
