"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";

import { PageHeader } from "@/components/patterns/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { saveSettings } from "@/lib/settings/settings.api";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import type { SettingsFormBodyProps } from "../AdminSettings.types";
import { toFormValues, toSettings, validateSettings } from "../AdminSettings.utils";
import styles from "../AdminSettings.module.scss";

/**
 * Settings/Body: store details, shipping rules, stock alerts and promo codes.
 *
 * @param props Component props.
 * @param props.settings Saved settings.
 * @returns The settings form.
 */
export const SettingsFormBody = ({ settings }: SettingsFormBodyProps) => {
  const { values, errors, setErrors, field } = useFormValues(toFormValues(settings));
  const [isSaved, setIsSaved] = useState(false);

  /**
   * Validates the form and saves the settings.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaved(false);
    const found = validateSettings(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    await saveSettings(toSettings(values));
    setIsSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Settings">
      <PageHeader
        title="Settings"
        description="Store details and rules that apply at checkout."
        actions={<Button type="primary" size="small" text="Save settings" typeAttribute="submit" />}
      />
      {isSaved && <Alert tone="success">Settings saved.</Alert>}
      <div className={styles.form}>
        <fieldset className={styles.group}>
          <legend className={styles.group__legend}>Store</legend>
          <Input label="Store name" error={errors.storeName} {...field("storeName")} />
          <div className={styles.group__row}>
            <Input label="Contact email" type="email" error={errors.contactEmail} {...field("contactEmail")} />
            <Input label="Contact phone" {...field("contactPhone")} />
            <Input label="Currency" error={errors.currency} {...field("currency")} />
          </div>
        </fieldset>
        <fieldset className={styles.group}>
          <legend className={styles.group__legend}>Shipping and stock</legend>
          <div className={styles.group__row}>
            <Input label="Shipping fee" type="number" error={errors.shippingFee} {...field("shippingFee")} />
            <Input label="Free shipping over" type="number" error={errors.freeShippingOver} {...field("freeShippingOver")} />
            <Input label="Low stock alert at" type="number" error={errors.lowStockThreshold} {...field("lowStockThreshold")} />
          </div>
        </fieldset>
        <fieldset className={styles.group}>
          <legend className={styles.group__legend}>Promo codes</legend>
          <TextArea label="Codes" hint="One per line as CODE | percent." error={errors.promoCodes} {...field("promoCodes")} />
        </fieldset>
      </div>
    </form>
  );
};
