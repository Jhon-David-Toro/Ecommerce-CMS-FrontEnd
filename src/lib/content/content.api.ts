import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import * as mock from "./content.mock";
import * as remote from "./content.remote";

const source = IS_API_ENABLED ? remote : mock;

export const pageRepository = source.pageRepository;
export const getContent = source.getContent;
export const saveContent = source.saveContent;
export const resetContent = source.resetContent;
export const listPages = source.listPages;
export const getPublishedPage = source.getPublishedPage;
