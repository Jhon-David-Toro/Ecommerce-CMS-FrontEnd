import { DEFAULT_CURRENCY, PRICE_LOCALE } from "./ProductPrice.constants";

/**
 * Formats an amount as currency.
 *
 * @param value Amount to format.
 * @param currency ISO currency code.
 * @returns The formatted amount, for example `$260.00`.
 */
export const formatPrice = (value: number, currency = DEFAULT_CURRENCY) =>
  new Intl.NumberFormat(PRICE_LOCALE, { style: "currency", currency }).format(value);
