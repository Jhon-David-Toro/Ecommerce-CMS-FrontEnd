import { CheckIcon } from "@heroicons/react/24/solid";

import type { BrandBulletsProps } from "../AuthLayout.types";
import styles from "../AuthLayout.module.scss";

/**
 * AuthLayout/BrandBullets: the benefits listed in the brand panel, each with a white tick.
 *
 * @param props Component props.
 * @param props.bullets Short benefits.
 * @returns The list.
 */
export const BrandBullets = ({ bullets }: BrandBulletsProps) => (
  <ul className={styles.brand__list}>
    {bullets.map((bullet) => (
      <li key={bullet}>
        <span className={styles.brand__dot}>
          <CheckIcon />
        </span>
        {bullet}
      </li>
    ))}
  </ul>
);
