"use client";

import type { FC } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";

import type { CheckoutFormProps } from "./CheckoutForm.types";
import { useCheckoutForm } from "./hooks/useCheckoutForm";
import { AddressFields } from "./parts/AddressFields";
import { ContactFields } from "./parts/ContactFields";
import { PaymentFields } from "./parts/PaymentFields";
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
  const form = useCheckoutForm(defaultEmail, onSubmit);

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate aria-label="Checkout">
      {error && <Alert>{error}</Alert>}
      <ContactFields field={form.field} errors={form.errors} />
      <AddressFields field={form.field} errors={form.errors} />
      <PaymentFields field={form.field} method={form.method} onMethodChange={form.setMethod} />
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
