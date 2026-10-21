import type { ClassValue } from "./cx.types";

/**
 * Turns one class value into the class names it stands for.
 *
 * @param value Text, falsy value or record of names toggled by booleans.
 * @returns The active class names.
 */
const toClassNames = (value: ClassValue): string[] => {
  if (!value) return [];
  if (typeof value === "string") return [value];
  return Object.keys(value).filter((name) => value[name]);
};

/**
 * Joins class names, skipping falsy values and records entries that are off.
 *
 * @param values Class names, falsy values or records of names toggled by booleans.
 * @returns A single class attribute value.
 */
export const cx = (...values: ClassValue[]) => values.flatMap(toClassNames).join(" ");
