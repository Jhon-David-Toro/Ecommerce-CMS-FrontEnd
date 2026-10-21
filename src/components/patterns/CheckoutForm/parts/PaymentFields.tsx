import { FieldGroup } from "@/components/patterns/FieldGroup";
import { SelectInput } from "@/components/ui/SelectInput";
import { TextArea } from "@/components/ui/TextArea";
import { PAYMENT_METHODS } from "@/lib/orders/order.constants";

import { PAYMENT_OPTIONS } from "../CheckoutForm.constants";
import type { PaymentFieldsProps } from "../CheckoutForm.types";
import { toPaymentMethod } from "../CheckoutForm.utils";
import styles from "../CheckoutForm.module.scss";

/**
 * CheckoutForm/Payment: payment method, what it means and notes for the order.
 *
 * @param props Component props.
 * @param props.field Builds the props of a text field.
 * @param props.method Selected payment method.
 * @param props.onMethodChange Called with the method the shopper picks.
 * @returns The group of fields.
 */
export const PaymentFields = ({ field, method, onMethodChange }: PaymentFieldsProps) => (
  <FieldGroup legend="Payment">
    <SelectInput
      label="Payment method"
      options={PAYMENT_OPTIONS}
      value={method}
      onChange={(event) => onMethodChange(toPaymentMethod(event.target.value))}
    />
    <p className={styles.form__hint}>{PAYMENT_METHODS[method]}: you pay when the order is confirmed with you.</p>
    <TextArea label="Order notes (optional)" {...field("notes")} />
  </FieldGroup>
);
