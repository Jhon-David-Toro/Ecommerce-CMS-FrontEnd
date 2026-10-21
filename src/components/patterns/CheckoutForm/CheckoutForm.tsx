"use client";

import { useState } from "react";
import type { FC, SubmitEvent } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SelectInput } from "@/components/ui/SelectInput";
import { TextArea } from "@/components/ui/TextArea";
import { PAYMENT_METHODS } from "@/lib/orders/order.constants";
import type { PaymentMethod } from "@/lib/orders/order.types";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { PAYMENT_OPTIONS } from "./CheckoutForm.constants";
import type { CheckoutFormProps } from "./CheckoutForm.types";
import { buildInitialValues, validateCheckout } from "./CheckoutForm.utils";
import styles from "./CheckoutForm.module.scss";

/**
 * CheckoutForm: contact, delivery address and payment method of an order.
 *
 * @param props Component props.
 * @param props.defaultEmail Email to start with, usually the one of the signed-in user.
 * @param props.error Error from a failed order, shown above the form.
 * @param props.isSubmitting Disables the button while the order is being placed.
 * @param props.onSubmit Called with the validated values.
 * @returns The checkout form.
 */
export const CheckoutForm: FC<CheckoutFormProps> = ({ defaultEmail, error, isSubmitting, onSubmit }) => {
  const { values, errors, setErrors, field } = useFormValues(buildInitialValues(defaultEmail));
  const [method, setMethod] = useState<PaymentMethod>("cash_on_delivery");

  /**
   * Validates the form and sends the values.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    if (!Object.keys(found).length) onSubmit({ ...values, paymentMethod: method });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Checkout">
      {error && <Alert>{error}</Alert>}
      <fieldset className={styles.form__group}>
        <legend className={styles.form__legend}>Contact</legend>
        <Input label="Email" type="email" autoComplete="email" error={errors.email} {...field("email")} />
        <Input label="Phone" type="tel" autoComplete="tel" error={errors.phone} {...field("phone")} />
      </fieldset>
      <fieldset className={styles.form__group}>
        <legend className={styles.form__legend}>Delivery address</legend>
        <Input label="Full name" autoComplete="name" error={errors.fullName} {...field("fullName")} />
        <Input label="Street address" autoComplete="street-address" error={errors.street} {...field("street")} />
        <div className={styles.form__row}>
          <Input label="City" autoComplete="address-level2" error={errors.city} {...field("city")} />
          <Input label="State / Province" autoComplete="address-level1" {...field("state")} />
        </div>
        <div className={styles.form__row}>
          <Input label="Postal code" autoComplete="postal-code" error={errors.postalCode} {...field("postalCode")} />
          <Input label="Country" autoComplete="country-name" error={errors.country} {...field("country")} />
        </div>
      </fieldset>
      <fieldset className={styles.form__group}>
        <legend className={styles.form__legend}>Payment</legend>
        <SelectInput
          label="Payment method"
          options={PAYMENT_OPTIONS}
          value={method}
          onChange={(event) => setMethod(event.target.value as PaymentMethod)}
        />
        <p className={styles.form__hint}>{PAYMENT_METHODS[method]}: you pay when the order is confirmed with you.</p>
        <TextArea label="Order notes (optional)" {...field("notes")} />
      </fieldset>
      <Button
        type="primary"
        size="large"
        text={isSubmitting ? "Placing order..." : "Place order"}
        typeAttribute="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};
