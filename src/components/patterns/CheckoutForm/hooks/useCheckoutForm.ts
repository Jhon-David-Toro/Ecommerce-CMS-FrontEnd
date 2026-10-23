import { useState } from "react";

import type { PaymentMethod } from "@/lib/orders/order.types";
import { createSubmitHandler } from "@/lib/shared/forms/submit";
import { useFormValues } from "@/lib/shared/forms/useFormValues";

import { DEFAULT_PAYMENT_METHOD } from "../CheckoutForm.constants";
import type { CheckoutSubmission } from "../CheckoutForm.types";
import { buildInitialValues, validateCheckout } from "../CheckoutForm.utils";

/**
 * Keeps the values, errors and payment method of the checkout form and sends them when valid.
 *
 * @param defaultEmail Email to prefill.
 * @param onSubmit Called with the validated values and the payment method.
 * @returns The errors, the field helper, the payment method with its setter and the submit handler.
 */
export const useCheckoutForm = (defaultEmail: string, onSubmit: (values: CheckoutSubmission) => void) => {
  const { values, errors, setErrors, field } = useFormValues(buildInitialValues(defaultEmail));
  const [method, setMethod] = useState<PaymentMethod>(DEFAULT_PAYMENT_METHOD);

  const handleSubmit = createSubmitHandler({
    values,
    validate: validateCheckout,
    setErrors,
    onValid: (valid) => onSubmit({ ...valid, paymentMethod: method }),
  });

  return { errors, field, method, setMethod, handleSubmit };
};
