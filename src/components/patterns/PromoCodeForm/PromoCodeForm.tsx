"use client";

import { useState } from "react";
import type { FC, SubmitEvent } from "react";

import { Button } from "@/components/ui/Button";

import type { PromoCodeFormProps } from "./PromoCodeForm.types";
import { PromoFeedback } from "./parts/PromoFeedback";
import { PromoInput } from "./parts/PromoInput";
import styles from "./PromoCodeForm.module.scss";

/**
 * PromoCodeForm: field to type a promo code and apply it, with feedback about the code in use.
 *
 * @param props Component props.
 * @param props.appliedCode Code currently applied to the cart.
 * @param props.discountPercent Discount that the applied code gives; 0 means the code is not valid.
 * @param props.onApply Called with the typed code.
 * @returns The promo form.
 */
export const PromoCodeForm: FC<PromoCodeFormProps> = ({ appliedCode, discountPercent, onApply }) => {
  const [code, setCode] = useState(appliedCode);

  /**
   * Applies the typed code.
   *
   * @param event Submit event of the form.
   */
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(code.trim());
  };

  return (
    <form className={styles.promo} onSubmit={handleSubmit}>
      <div className={styles.promo__row}>
        <PromoInput value={code} onChange={setCode} />
        <Button type="primary" size="small" text="Apply" typeAttribute="submit" />
      </div>
      <PromoFeedback appliedCode={appliedCode} discountPercent={discountPercent} />
    </form>
  );
};
