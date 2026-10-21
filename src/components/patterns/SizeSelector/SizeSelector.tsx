import type { FC } from "react";

import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/shared/classnames/cx";

import type { SizeSelectorProps } from "./SizeSelector.types";
import styles from "./SizeSelector.module.scss";

/**
 * SizeSelector: row of size buttons that behave as toggles.
 *
 * @param props Component props.
 * @param props.sizes Available sizes.
 * @param props.selectedSize Selected size.
 * @param props.onSizeChange Called with the size the user picks.
 * @returns The size selector.
 */
export const SizeSelector: FC<SizeSelectorProps> = ({ sizes, selectedSize, onSizeChange }) => (
  <section className={styles.sizes}>
    <p>Choose Size</p>
    <div className={styles.sizes__options}>
      {sizes.map((size) => (
        <Button
          key={size}
          type="tertiary"
          text={size}
          size="extra-small-product"
          margin="zero"
          className={cx(styles.sizes__button, { [styles.selected]: selectedSize === size })}
          ariaPressed={selectedSize === size}
          onClick={() => onSizeChange(size)}
          typeAttribute="button"
        />
      ))}
    </div>
  </section>
);
