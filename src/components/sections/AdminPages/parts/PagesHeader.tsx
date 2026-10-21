import { PageHeader } from "@/components/patterns/PageHeader";
import { Button } from "@/components/ui/Button";

import type { PagesHeaderProps } from "../AdminPages.types";

/**
 * Pages/Header: page title with the button that starts a new page.
 *
 * @param props Component props.
 * @param props.onNew Called when the button is pressed.
 * @returns The header.
 */
export const PagesHeader = ({ onNew }: PagesHeaderProps) => (
  <PageHeader
    title="Pages"
    description="Text pages linked from the footer and the menus."
    actions={<Button type="primary" size="small" text="New page" typeAttribute="button" onClick={onNew} />}
  />
);
