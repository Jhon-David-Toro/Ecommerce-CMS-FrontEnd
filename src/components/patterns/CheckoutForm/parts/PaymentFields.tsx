import { FieldGroup } from "@/components/patterns/FieldGroup";
import { TextArea } from "@/components/ui/TextArea";

import { PAYMENT_OPTIONS } from "../CheckoutForm.constants";
import type { PaymentFieldsProps } from "../CheckoutForm.types";
import { PaymentOption } from "./PaymentOption";
import styles from "../CheckoutForm.module.scss";

/**
 * CheckoutForm/Payment: payment method as two cards and notes for the order.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.method Selected payment method.
 * @param props.onMethodChange Called with the method the shopper picks.
 * @returns The group of fields.
 */
export const PaymentFields = ({ field, method, onMethodChange }: PaymentFieldsProps) => (
  <FieldGroup legend="Payment method">
    <div className={styles.form__options} role="radiogroup" aria-label="Payment method">
      {PAYMENT_OPTIONS.map((option) => (
        <PaymentOption key={option.value} option={option} selected={option.value === method} onSelect={onMethodChange} />
      ))}
    </div>
    <TextArea label="Order notes (optional)" {...field("notes")} />
  </FieldGroup>
);
