import { PageHeader } from "@/components/patterns/PageHeader";
import { Button } from "@/components/ui/Button";

import type { TaxonomyHeaderProps } from "../TaxonomyManager.types";

/**
 * TaxonomyManager/Header: page title with the button that starts a new record.
 *
 * @param props Component props.
 * @param props.title Title of the page.
 * @param props.description Sentence under the title.
 * @param props.singular Name of one record, for the button.
 * @param props.onNew Called when the button is pressed.
 * @returns The header.
 */
export const TaxonomyHeader = ({ title, description, singular, onNew }: TaxonomyHeaderProps) => (
  <PageHeader
    title={title}
    description={description}
    actions={<Button type="primary" size="small" text={`New ${singular}`} typeAttribute="button" onClick={onNew} />}
  />
);
