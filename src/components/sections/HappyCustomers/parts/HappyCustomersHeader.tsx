import { SliderButton } from "@/components/ui/SliderButton";

import type { HappyCustomersHeaderProps } from "../HappyCustomers.types";
import styles from "../HappyCustomers.module.scss";

/**
 * HappyCustomers/Header: section title and the two slider arrows.
 *
 * @param props Component props.
 * @param props.onPrevious Called when the left arrow is pressed.
 * @param props.onNext Called when the right arrow is pressed.
 * @param props.disabled Disables both arrows.
 * @returns The header.
 */
export const HappyCustomersHeader = ({ onPrevious, onNext, disabled }: HappyCustomersHeaderProps) => (
  <header className={styles.happy__title}>
    <span className={styles.happy__title_span}>OUR HAPPY CUSTOMERS</span>
    <div className={styles.happy__title_button}>
      <SliderButton direction="left" onClick={onPrevious} disabled={disabled} />
      <SliderButton direction="right" onClick={onNext} disabled={disabled} />
    </div>
  </header>
);
