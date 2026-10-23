import { EMAIL_PATTERN, MESSAGES } from "./forms.constants";
import type { Errors } from "./forms.types";

/**
 * Checks that a value is not empty.
 *
 * @param value Text typed by the user.
 * @param message Error to report.
 * @returns The error, or undefined when the value is valid.
 */
export const required = (value: string, message: string = MESSAGES.required) => (value.trim() ? undefined : message);

/**
 * Checks that a value looks like an email address.
 *
 * @param value Text typed by the user.
 * @returns The error, or undefined when the value is valid.
 */
export const email = (value: string) => (EMAIL_PATTERN.test(value.trim()) ? undefined : MESSAGES.email);

/**
 * Checks that a value is a number of at least a minimum.
 *
 * @param value Text typed by the user.
 * @param min Smallest accepted number.
 * @returns The error, or undefined when the value is valid.
 */
export const minNumber = (value: string | number, min: number) =>
  Number(value) >= min && value !== "" ? undefined : `Must be ${min} or more.`;

/**
 * Checks that a value has at least a number of characters.
 *
 * @param value Text typed by the user.
 * @param length Minimum length.
 * @returns The error, or undefined when the value is valid.
 */
export const minLength = (value: string, length: number) =>
  value.length >= length ? undefined : `Must have at least ${length} characters.`;

/**
 * Keeps only the fields that have an error.
 *
 * @param errors Map of field to error, where valid fields are undefined.
 * @returns The map without the valid fields.
 */
export const compact = (errors: Record<string, string | undefined>): Errors =>
  Object.fromEntries(Object.entries(errors).filter((entry): entry is [string, string] => Boolean(entry[1])));
