import type { SiteContent, StatContent } from "@/lib/content/content.types";
import { compact, required } from "@/lib/shared/forms/validators";
import { toLines } from "@/lib/shared/text/text";
import type { FooterColumn, FooterLink } from "@/lib/site/footer.types";
import type { MenuItem } from "@/lib/site/menuItem.types";

import { COLUMNS_ERROR, COLUMN_MARKER, FIELD_SEPARATOR, LIST_ERROR, STATS_ERROR } from "./AdminContent.constants";
import type { ContentFormValues } from "./AdminContent.types";

/**
 * Splits a line into its trimmed parts.
 *
 * @param line Line with parts separated by `|`.
 * @returns The parts.
 */
const splitLine = (line: string) => line.split(FIELD_SEPARATOR).map((part) => part.trim());

/**
 * Writes links as one `Label | address` line each, with the optional picture as a third part.
 *
 * @param links Menu or footer links.
 * @returns The text for the field.
 */
export const formatLinks = (links: FooterLink[]) =>
  links.map((link) => [link.label, link.href, link.src].filter(Boolean).join(` ${FIELD_SEPARATOR} `)).join("\n");

/**
 * Reads links from `Label | address | picture` lines.
 *
 * @param text Text of the field.
 * @returns The links; lines without a label and an address are skipped.
 */
export const parseLinks = (text: string): FooterLink[] =>
  toLines(text)
    .map(splitLine)
    .filter(([label, href]) => label && href)
    .map(([label, href, src]) => (src ? { label, href, src } : { label, href }));

/**
 * Reads a menu from `Label | address` lines.
 *
 * @param text Text of the field.
 * @returns The menu items.
 */
export const parseMenu = (text: string): MenuItem[] => parseLinks(text).map(({ label, href }) => ({ label, href }));

/**
 * Writes the stats as one `number | label` line each.
 *
 * @param stats Stats of the store.
 * @returns The text for the field.
 */
export const formatStats = (stats: StatContent[]) => stats.map((stat) => `${stat.endValue} ${FIELD_SEPARATOR} ${stat.label}`).join("\n");

/**
 * Reads the stats from `number | label` lines.
 *
 * @param text Text of the field.
 * @returns The stats; lines without a valid number and a label are skipped.
 */
export const parseStats = (text: string): StatContent[] =>
  toLines(text)
    .map(splitLine)
    .map(([value, label]) => ({ endValue: Number(value), label }))
    .filter((stat) => stat.endValue > 0 && stat.label);

/**
 * Writes footer columns as a `# Title` line followed by one link line each.
 *
 * @param columns Footer columns.
 * @returns The text for the field.
 */
export const formatColumns = (columns: FooterColumn[]) =>
  columns.map((column) => `${COLUMN_MARKER}${column.title}\n${formatLinks(column.links)}`).join("\n\n");

/**
 * Reads footer columns from `# Title` lines followed by link lines.
 *
 * @param text Text of the field.
 * @returns The columns; links that come before the first title are skipped.
 */
export const parseColumns = (text: string): FooterColumn[] =>
  toLines(text).reduce<FooterColumn[]>((columns, line) => {
    if (line.startsWith(COLUMN_MARKER)) return [...columns, { title: line.slice(COLUMN_MARKER.length).trim(), links: [] }];
    const link = parseLinks(line)[0];
    const last = columns[columns.length - 1];
    return last && link ? [...columns.slice(0, -1), { ...last, links: [...last.links, link] }] : columns;
  }, []);

/**
 * Counts the useful lines that a footer columns text produces.
 *
 * @param columns Parsed columns.
 * @returns Titles plus links.
 */
const countColumnLines = (columns: FooterColumn[]) => columns.reduce((sum, column) => sum + 1 + column.links.length, 0);

/**
 * Builds the form values from the saved content.
 *
 * @param content Saved storefront content.
 * @returns The form values.
 */
export const toFormValues = (content: SiteContent): ContentFormValues => ({
  bannerEnabled: content.banner.enabled,
  bannerText: content.banner.text,
  bannerLinkText: content.banner.linkText,
  bannerLinkHref: content.banner.linkHref,
  heroTitle: content.hero.title,
  heroParagraph: content.hero.paragraph,
  heroCtaText: content.hero.ctaText,
  heroCtaHref: content.hero.ctaHref,
  heroDesktopImage: content.hero.desktopImage,
  heroMobileImage: content.hero.mobileImage,
  stats: formatStats(content.stats),
  navbar: formatLinks(content.navbar),
  sidebar: formatLinks(content.sidebar),
  footerTagline: content.footerTagline,
  footerColumns: formatColumns(content.footerColumns),
});

/**
 * Turns the form values into storefront content.
 *
 * @param values Values from the form.
 * @returns The content to save.
 */
export const toContent = (values: ContentFormValues): SiteContent => ({
  banner: {
    enabled: values.bannerEnabled,
    text: values.bannerText.trim(),
    linkText: values.bannerLinkText.trim(),
    linkHref: values.bannerLinkHref.trim(),
  },
  hero: {
    title: values.heroTitle.trim(),
    paragraph: values.heroParagraph.trim(),
    ctaText: values.heroCtaText.trim(),
    ctaHref: values.heroCtaHref.trim(),
    desktopImage: values.heroDesktopImage.trim(),
    mobileImage: values.heroMobileImage.trim(),
  },
  stats: parseStats(values.stats),
  navbar: parseMenu(values.navbar),
  sidebar: parseMenu(values.sidebar),
  footerTagline: values.footerTagline.trim(),
  footerColumns: parseColumns(values.footerColumns),
});

/**
 * Tells whether every non-empty line of a field was understood.
 *
 * @param text Text of the field.
 * @param understood How many lines were understood.
 * @param message Error to report otherwise.
 * @returns The error, or undefined when every line is valid.
 */
const allLinesUnderstood = (text: string, understood: number, message: string) =>
  toLines(text).length === understood ? undefined : message;

/**
 * Checks the content form.
 *
 * @param values Values from the form.
 * @returns The errors by field; empty when the form is valid.
 */
export const validateContent = (values: ContentFormValues) =>
  compact({
    bannerText: values.bannerEnabled ? required(values.bannerText) : undefined,
    heroTitle: required(values.heroTitle),
    heroCtaHref: required(values.heroCtaHref),
    stats: allLinesUnderstood(values.stats, parseStats(values.stats).length, STATS_ERROR),
    navbar: allLinesUnderstood(values.navbar, parseMenu(values.navbar).length, LIST_ERROR),
    sidebar: allLinesUnderstood(values.sidebar, parseMenu(values.sidebar).length, LIST_ERROR),
    footerColumns: allLinesUnderstood(values.footerColumns, countColumnLines(parseColumns(values.footerColumns)), COLUMNS_ERROR),
  });
