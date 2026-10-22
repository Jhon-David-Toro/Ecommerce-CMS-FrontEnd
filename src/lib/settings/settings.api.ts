import { IS_API_ENABLED } from "@/lib/shared/http/api.constants";

import * as mock from "./settings.mock";
import * as remote from "./settings.remote";

const source = IS_API_ENABLED ? remote : mock;

export const getSettings = source.getSettings;
export const saveSettings = source.saveSettings;
export const lookupPromoPercent = source.lookupPromoPercent;
