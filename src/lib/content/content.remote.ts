import { isAdminSession } from "@/lib/auth/auth.session";
import { apiRequest } from "@/lib/shared/http/apiClient";
import { createRemoteRepository, nullWhenMissing } from "@/lib/shared/http/remoteRepository";

import { DEFAULT_CONTENT } from "./content.constants";
import type { SiteContent, StaticPage } from "./content.types";

export const pageRepository = createRemoteRepository<StaticPage>({
  listPath: () => (isAdminSession() ? "/api/admin/pages" : "/api/public/pages"),
  itemPath: "/api/admin/pages",
});

/**
 * Reads the editable storefront content: what the API saved merged over the defaults.
 * When the API cannot be reached the defaults are used so the store keeps working.
 *
 * @returns The content.
 */
export const getContent = async (): Promise<SiteContent> => {
  try {
    return { ...DEFAULT_CONTENT, ...(await apiRequest<Partial<SiteContent>>("/api/public/content")) };
  } catch {
    return DEFAULT_CONTENT;
  }
};

/**
 * Saves the storefront content (administrators only).
 *
 * @param content Content to store.
 * @returns The content as the API saved it.
 */
export const saveContent = (content: SiteContent) => apiRequest<SiteContent>("/api/admin/content", { method: "PUT", body: content });

/**
 * Restores the default storefront content.
 *
 * @returns The default content.
 */
export const resetContent = async () => {
  await apiRequest<void>("/api/admin/content", { method: "DELETE" });
  return DEFAULT_CONTENT;
};

/**
 * Lists the static pages: every page for administrators, the published ones for everybody else.
 *
 * @returns The pages.
 */
export const listPages = () => pageRepository.list();

/**
 * Finds a published page by its slug.
 *
 * @param slug Page slug.
 * @returns The page, or null when it does not exist or is a draft.
 */
export const getPublishedPage = (slug: string) =>
  apiRequest<StaticPage>(`/api/public/pages/${encodeURIComponent(slug)}`).catch(nullWhenMissing);
