/**
 * Adds an item to a list, or removes it when it is already there.
 *
 * @param items Current list.
 * @param item Item to toggle.
 * @returns A new list with the item toggled.
 */
export const toggleItem = <T>(items: T[], item: T) =>
  items.includes(item) ? items.filter((existing) => existing !== item) : [...items, item];

/**
 * Lists the integers between two numbers, both included.
 *
 * @param from First number.
 * @param to Last number.
 * @returns The consecutive integers, or an empty list when `to` is below `from`.
 */
export const range = (from: number, to: number) => Array.from({ length: Math.max(to - from + 1, 0) }, (_, index) => from + index);
