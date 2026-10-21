import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import type { ContentHeaderProps } from "../AdminContent.types";

/**
 * Content/Header: title with the restore and save buttons, followed by the notice shown after either.
 *
 * @param props Component props.
 * @param props.notice Message to show; empty hides it.
 * @param props.onReset Called when the restore button is pressed.
 * @returns The header.
 */
export const ContentHeader = ({ notice, onReset }: ContentHeaderProps) => (
  <>
    <PageHeader
      title="Site content"
      description="Edit what shoppers read on the banner, home page, menus and footer."
      actions={
        <>
          <Button type="secondary" size="small" text="Restore original" typeAttribute="button" onClick={onReset} />
          <Button type="primary" size="small" text="Save changes" typeAttribute="submit" />
        </>
      }
    />
    {notice && <Alert tone="success">{notice}</Alert>}
  </>
);
