import { DEFAULT_CURRENCY, FORMAT_LOCALE } from "./format.constants";

/**
 * Formats an amount as currency.
 *
 * @param value Amount to format.
 * @param currency ISO currency code.
 * @returns The formatted amount, for example `$260.00`.
 */
export const formatPrice = (value: number, currency = DEFAULT_CURRENCY) =>
  new Intl.NumberFormat(FORMAT_LOCALE, { style: "currency", currency }).format(value);

/**
 * Formats a date for display.
 *
 * @param iso ISO date text or any text `Date` understands.
 * @returns The date as `August 14, 2023`, or the original text when it is not a valid date.
 */
export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleDateString(FORMAT_LOCALE, { year: "numeric", month: "long", day: "numeric" });
};
