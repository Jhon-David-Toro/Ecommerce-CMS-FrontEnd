import { CheckIcon } from "@heroicons/react/24/solid";

import { cx } from "@/lib/shared/classnames/cx";

import type { StepItemProps } from "../CheckoutSteps.types";
import { getStepState } from "../CheckoutSteps.utils";
import styles from "../CheckoutSteps.module.scss";

/**
 * CheckoutSteps/Item: one stage with its dot, label and the line that leads to the next one.
 *
 * @param props Component props.
 * @param props.number Position of the stage, starting at 1.
 * @param props.label Name of the stage.
 * @param props.current Stage the shopper is on.
 * @param props.isLast Hides the line after the last stage.
 * @returns The list item.
 */
export const StepItem = ({ number, label, current, isLast }: StepItemProps) => {
  const state = getStepState(number, current);

  return (
    <li className={cx(styles.step, styles[`step_${state}`])} aria-current={state === "active" ? "step" : undefined}>
      <span className={styles.step__dot}>{state === "done" ? <CheckIcon className={styles.step__check} /> : number}</span>
      <span className={styles.step__label}>{label}</span>
      {!isLast && <span className={styles.step__line} aria-hidden="true" />}
    </li>
  );
};
