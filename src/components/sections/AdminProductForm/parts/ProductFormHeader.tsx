import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import { LIST_ROUTE } from "../AdminProductForm.constants";
import type { ProductFormHeaderProps } from "../AdminProductForm.types";

/**
 * ProductForm/Header: title, cancel link and save button, followed by the error of a failed save.
 *
 * @param props Component props.
 * @param props.title Headline of the page.
 * @param props.isSaving Whether a save is in progress.
 * @param props.failure Error message of a failed save; empty when there is none.
 * @returns The header.
 */
export const ProductFormHeader = ({ title, isSaving, failure }: ProductFormHeaderProps) => (
  <>
    <PageHeader
      title={title}
      actions={
        <>
          <Button type="secondary" size="small" text="Cancel" href={LIST_ROUTE} typeAttribute="button" />
          <Button type="primary" size="small" text={isSaving ? "Saving..." : "Save product"} typeAttribute="submit" disabled={isSaving} />
        </>
      }
    />
    {failure && <Alert>{failure}</Alert>}
  </>
);
