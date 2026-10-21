import { FieldGroup } from "@/components/patterns/FieldGroup";
import { Checkbox } from "@/components/ui/Checkbox";

import { ALERT_OPTIONS } from "../AdminAccount.constants";
import { useAlertPreferences } from "../hooks/useAlertPreferences";

/**
 * AdminAccount/AlertPreferences: choose which events the admin wants to hear about by email.
 *
 * @returns The group of checkboxes.
 */
export const AlertPreferences = () => {
  const { alerts, toggle } = useAlertPreferences();

  return (
    <FieldGroup legend="Email alerts">
      {ALERT_OPTIONS.map(({ key, label }) => (
        <Checkbox key={key} label={label} checked={alerts[key]} onChange={() => toggle(key)} />
      ))}
    </FieldGroup>
  );
};
