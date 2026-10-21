import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import type { SettingsHeaderProps } from "../AdminSettings.types";

/**
 * Settings/Header: title and save button, followed by the notice shown after a save.
 *
 * @param props Component props.
 * @param props.isSaved Whether the last save worked.
 * @returns The header.
 */
export const SettingsHeader = ({ isSaved }: SettingsHeaderProps) => (
  <>
    <PageHeader
      title="Settings"
      description="Store details and rules that apply at checkout."
      actions={<Button type="primary" size="small" text="Save settings" typeAttribute="submit" />}
    />
    {isSaved && <Alert tone="success">Settings saved.</Alert>}
  </>
);
