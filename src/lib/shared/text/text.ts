/**
 * Turns a title into a URL-friendly slug.
 *
 * @param text Text to convert.
 * @returns Lowercase words joined by hyphens, without accents or symbols.
 */
export const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * Splits multi-line text into trimmed, non-empty lines.
 *
 * @param text Text with one item per line.
 * @returns The lines.
 */
export const toLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * Splits text into paragraphs separated by blank lines.
 *
 * @param text Text with paragraphs.
 * @returns The trimmed, non-empty paragraphs.
 */
export const toParagraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
