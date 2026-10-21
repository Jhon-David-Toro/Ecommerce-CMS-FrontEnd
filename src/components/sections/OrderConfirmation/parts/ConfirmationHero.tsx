import { CheckIcon } from "@heroicons/react/24/solid";

import type { ConfirmationHeroProps } from "../OrderConfirmation.types";
import styles from "../OrderConfirmation.module.scss";

/**
 * OrderConfirmation/Hero: big check, thank you title and where the details were sent.
 *
 * @param props Component props.
 * @param props.email Email the details were sent to.
 * @returns The hero.
 */
export const ConfirmationHero = ({ email }: ConfirmationHeroProps) => (
  <>
    <span className={styles.confirmation__check} aria-hidden="true">
      <CheckIcon />
    </span>
    <h1 className={styles.confirmation__title}>THANK YOU FOR YOUR ORDER!</h1>
    <p className={styles.confirmation__text}>We sent the details to {email}. We will let you know when your order ships.</p>
  </>
);
