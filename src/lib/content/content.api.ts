import { createRepository } from "@/lib/mock/repository";
import { readJson, removeJson, writeJson } from "@/lib/shared/storage/storage";

import { CONTENT_STORAGE_KEY, DEFAULT_CONTENT, DEFAULT_PAGES, PAGE_STORAGE_KEY } from "./content.constants";
import type { SiteContent, StaticPage } from "./content.types";

export const pageRepository = createRepository<StaticPage>(PAGE_STORAGE_KEY, () =>
  DEFAULT_PAGES.map((page, index) => ({ id: index + 1, ...page })),
);

/**
 * Reads the editable storefront content.
 *
 * @returns The saved content merged over the defaults.
 */
export const getContent = async (): Promise<SiteContent> => ({
  ...DEFAULT_CONTENT,
  ...readJson<Partial<SiteContent>>(CONTENT_STORAGE_KEY, {}),
});

/**
 * Saves the storefront content.
 *
 * @param content Content to store.
 * @returns The saved content.
 */
export const saveContent = async (content: SiteContent) => {
  writeJson(CONTENT_STORAGE_KEY, content);
  return content;
};

/**
 * Restores the default storefront content.
 *
 * @returns The default content.
 */
export const resetContent = async () => {
  removeJson(CONTENT_STORAGE_KEY);
  return DEFAULT_CONTENT;
};

/**
 * Lists the static pages.
 *
 * @returns All pages.
 */
export const listPages = () => pageRepository.list();

/**
 * Finds a published page by its slug.
 *
 * @param slug Page slug.
 * @returns The page, or null when it does not exist or is a draft.
 */
export const getPublishedPage = async (slug: string) =>
  (await pageRepository.list()).find((page) => page.slug === slug && page.published) ?? null;
