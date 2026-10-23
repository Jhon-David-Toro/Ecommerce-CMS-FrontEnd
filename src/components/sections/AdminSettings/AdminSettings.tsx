"use client";

import { Spinner } from "@/components/ui/Spinner";
import { getSettings } from "@/lib/settings/settings.api";
import { useQuery } from "@/lib/shared/async/useQuery";

import { NO_ARGS } from "./AdminSettings.constants";
import { SettingsFormBody } from "./parts/SettingsFormBody";

/**
 * AdminSettings: loads the store settings and shows the form to change them.
 *
 * @returns The settings page content.
 */
export const AdminSettings = () => {
  const { data, isLoading } = useQuery(getSettings, NO_ARGS);

  if (isLoading || !data) return <Spinner label="Loading settings" />;

  return <SettingsFormBody settings={data} />;
};
