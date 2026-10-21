/**
 * Builds the element id that links a footer column to its title.
 *
 * @param title Title of the column.
 * @returns The element id.
 */
export const getFooterSectionId = (title: string) => `footer-${title.toLowerCase()}`;
