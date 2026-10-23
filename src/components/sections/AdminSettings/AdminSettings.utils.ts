import type { PromoCode, StoreSettings } from "@/lib/settings/settings.types";
import { compact, email, minNumber, required } from "@/lib/shared/forms/validators";
import { toLines } from "@/lib/shared/text/text";

import { MAX_PERCENT, PROMO_ERROR, PROMO_SEPARATOR } from "./AdminSettings.constants";
import type { SettingsFormValues } from "./AdminSettings.types";

/**
 * Writes promo codes as one `CODE | percent` line each.
 *
 * @param codes Promo codes of the store.
 * @returns The text for the promo codes field.
 */
export const formatPromoCodes = (codes: PromoCode[]) =>
  codes.map((promo) => `${promo.code} ${PROMO_SEPARATOR} ${promo.percent}`).join("\n");

/**
 * Reads promo codes from `CODE | percent` lines.
 *
 * @param text Text of the promo codes field.
 * @returns The codes in upper case; lines that are not valid are skipped.
 */
export const parsePromoCodes = (text: string): PromoCode[] =>
  toLines(text)
    .map((line) => line.split(PROMO_SEPARATOR).map((part) => part.trim()))
    .map(([code, percent]) => ({ code: (code ?? "").toUpperCase(), percent: Number(percent) }))
    .filter((promo) => promo.code && promo.percent > 0 && promo.percent <= MAX_PERCENT);

/**
 * Tells whether every non-empty line of the promo codes field is a valid code.
 *
 * @param text Text of the promo codes field.
 * @returns The error, or undefined when every line is valid.
 */
export const validatePromoCodes = (text: string) => (parsePromoCodes(text).length === toLines(text).length ? undefined : PROMO_ERROR);

/**
 * Builds the form values from the saved settings.
 *
 * @param settings Saved settings.
 * @returns The form values, all as text.
 */
export const toFormValues = (settings: StoreSettings): SettingsFormValues => ({
  storeName: settings.storeName,
  contactEmail: settings.contactEmail,
  contactPhone: settings.contactPhone,
  currency: settings.currency,
  shippingFee: String(settings.shippingFee),
  freeShippingOver: String(settings.freeShippingOver),
  lowStockThreshold: String(settings.lowStockThreshold),
  promoCodes: formatPromoCodes(settings.promoCodes),
});

/**
 * Turns the form values into store settings.
 *
 * @param values Values from the form.
 * @returns The settings to save.
 */
export const toSettings = (values: SettingsFormValues): StoreSettings => ({
  storeName: values.storeName.trim(),
  contactEmail: values.contactEmail.trim(),
  contactPhone: values.contactPhone.trim(),
  currency: values.currency.trim().toUpperCase(),
  shippingFee: Number(values.shippingFee),
  freeShippingOver: Number(values.freeShippingOver),
  lowStockThreshold: Number(values.lowStockThreshold),
  promoCodes: parsePromoCodes(values.promoCodes),
});

/**
 * Checks the settings form.
 *
 * @param values Values from the form.
 * @returns The errors by field; empty when the form is valid.
 */
export const validateSettings = (values: SettingsFormValues) =>
  compact({
    storeName: required(values.storeName),
    contactEmail: email(values.contactEmail),
    currency: required(values.currency),
    shippingFee: minNumber(values.shippingFee, 0),
    freeShippingOver: minNumber(values.freeShippingOver, 0),
    lowStockThreshold: minNumber(values.lowStockThreshold, 0),
    promoCodes: validatePromoCodes(values.promoCodes),
  });
