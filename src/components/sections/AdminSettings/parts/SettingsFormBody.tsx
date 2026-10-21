"use client";

import type { SettingsFormBodyProps } from "../AdminSettings.types";
import { useSettingsForm } from "../hooks/useSettingsForm";
import { PromoFields } from "./PromoFields";
import { SettingsHeader } from "./SettingsHeader";
import { ShippingFields } from "./ShippingFields";
import { StoreFields } from "./StoreFields";
import styles from "../AdminSettings.module.scss";

/**
 * Settings/Body: store details, shipping rules, stock alerts and promo codes.
 *
 * @param props Component props.
 * @param props.settings Saved settings.
 * @returns The settings form.
 */
export const SettingsFormBody = ({ settings }: SettingsFormBodyProps) => {
  const form = useSettingsForm(settings);

  return (
    <form onSubmit={form.handleSubmit} noValidate aria-label="Settings">
      <SettingsHeader isSaved={form.isSaved} />
      <div className={styles.form}>
        <StoreFields field={form.field} errors={form.errors} />
        <ShippingFields field={form.field} errors={form.errors} />
        <PromoFields field={form.field} errors={form.errors} />
      </div>
    </form>
  );
};
